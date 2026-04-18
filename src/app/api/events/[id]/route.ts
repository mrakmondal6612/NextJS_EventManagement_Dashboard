import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Event from '@/models/Event'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const event = await Event.findById(params.id).populate('organizerId', 'firstName lastName email')

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event retrieved successfully',
        data: event,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get event error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const updateData = await req.json()

    const event = await Event.findByIdAndUpdate(params.id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event updated successfully',
        data: event,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update event error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const event = await Event.findByIdAndDelete(params.id)

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete event error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
