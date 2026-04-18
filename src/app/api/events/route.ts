import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Event from '@/models/Event'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    let query: any = { status: 'published' }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const events = await Event.find(query)
      .populate('organizerId', 'firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ startDate: 1 })

    const total = await Event.countDocuments(query)

    return NextResponse.json(
      {
        success: true,
        message: 'Events retrieved successfully',
        data: {
          events,
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
    console.error('Get events error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const data = await req.json()

    // Generate slug from title
    const slug = generateSlug(data.title)

    // Check if slug already exists
    const existingEvent = await Event.findOne({ slug })
    if (existingEvent) {
      return NextResponse.json(
        { success: false, message: 'Event with this title already exists' },
        { status: 400 }
      )
    }

    const event = await Event.create({
      ...data,
      slug,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Event created successfully',
        data: event,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
