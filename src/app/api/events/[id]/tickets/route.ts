import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Ticket from '@/models/Ticket'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const tickets = await Ticket.find({ eventId: params.id }).sort({ createdAt: 1 })

    return NextResponse.json(
      {
        success: true,
        message: 'Tickets retrieved successfully',
        data: tickets,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get tickets error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const data = await req.json()

    const ticket = await Ticket.create({
      eventId: params.id,
      ...data,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Ticket created successfully',
        data: ticket,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create ticket error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
