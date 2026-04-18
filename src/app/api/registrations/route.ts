import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Registration from '@/models/Registration'
import Event from '@/models/Event'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const eventId = searchParams.get('eventId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (eventId) {
      query.eventId = eventId
    }

    const registrations = await Registration.find(query)
      .populate('eventId', 'title')
      .populate('userId', 'email firstName lastName')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const total = await Registration.countDocuments(query)

    return NextResponse.json(
      {
        success: true,
        message: 'Registrations retrieved successfully',
        data: {
          registrations,
          pagination: {
            current: page,
            total: Math.ceil(total / limit),
            limit,
            totalRecords: total,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get registrations error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { eventId, userId, ticketId, email, firstName, lastName, phone, customFields } =
      await req.json()

    // Validation
    if (!eventId || !userId || !ticketId || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if event exists
    const event = await Event.findById(eventId)
    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      eventId,
      userId,
    })

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, message: 'User already registered for this event' },
        { status: 400 }
      )
    }

    const registration = await Registration.create({
      eventId,
      userId,
      ticketId,
      email,
      firstName,
      lastName,
      phone,
      customFields,
      status: 'confirmed',
      paymentStatus: 'completed',
    })

    // Update event registration count
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: 1 },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration created successfully',
        data: registration,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create registration error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
