import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Registration from '@/models/Registration'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '7')

    const now = new Date()
    const start = new Date(now)
    start.setDate(now.getDate() - (days - 1))
    start.setHours(0, 0, 0, 0)

    const pipeline = [
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
          revenue: { $sum: '$paidAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]

    const results = await Registration.aggregate(pipeline)

    return NextResponse.json({ success: true, data: results }, { status: 200 })
  } catch (error) {
    console.error('Metrics registrations error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
