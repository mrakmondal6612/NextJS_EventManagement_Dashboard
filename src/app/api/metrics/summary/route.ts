import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Event from '@/models/Event'
import Registration from '@/models/Registration'

export async function GET() {
  try {
    await connectDB()

    const totalEvents = await Event.countDocuments({ status: 'published' })
    const totalRegistrations = await Registration.countDocuments({})

    const agg = await Registration.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$paidAmount' } } },
    ])

    const totalRevenue = agg && agg.length ? agg[0].total : 0

    return NextResponse.json(
      {
        success: true,
        totalEvents,
        totalRegistrations,
        totalRevenue,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Metrics summary error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
