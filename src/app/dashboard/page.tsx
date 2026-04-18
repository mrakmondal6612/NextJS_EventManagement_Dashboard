import React from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Navigation } from '@/components/shared/Navigation'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ChartArea } from '@/components/dashboard/ChartArea'
import { TicketBreakdownChart } from '@/components/dashboard/TicketBreakdownChart'
import { WeatherCard } from '@/components/dashboard/WeatherCard'
import connectDB from '@/lib/db'
import Event from '@/models/Event'
import Registration from '@/models/Registration'

export default async function DashboardPage() {
  await connectDB()

  const totalEvents = await Event.countDocuments({ status: 'published' })
  const totalRegistrations = await Registration.countDocuments({})

  const revenueAgg = await Registration.aggregate([
    { $match: { paymentStatus: 'completed' } },
    { $group: { _id: null, total: { $sum: '$paidAmount' } } },
  ])
  const totalRevenue = revenueAgg && revenueAgg.length ? revenueAgg[0].total : 0

  const recentRegs = await Registration.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('eventId', 'title')
    .lean()

  const events = await Event.find({ status: 'published' }).sort({ startDate: 1 }).limit(4).lean()

  const stats = [
    { label: 'Total Events', value: totalEvents },
    { label: 'Total Attendees', value: totalRegistrations },
    { label: 'Total Revenue', value: `$${Number(totalRevenue || 0).toLocaleString()}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back! Here's your event overview.</p>
            </div>

            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Registrations (7 Days)</h3>
                <ChartArea endpoint="/api/metrics/registrations?days=7" label="Registrations (7d)" />
              </div>
              <WeatherCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Tickets by Gender</h3>
                <TicketBreakdownChart />
              </div>
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Revenue (7 Days)</h3>
                <ChartArea endpoint="/api/metrics/sales?days=7" label="Revenue (7d)" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                {recentRegs.length === 0 ? (
                  <p className="text-gray-500">No recent activity</p>
                ) : (
                  <ul className="space-y-4">
                    {recentRegs.map((r: any, idx: number) => (
                      <li key={r._id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{r.eventId?.title || 'Event'}</div>
                          <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">${(r.paidAmount || 0).toFixed(2)}</div>
                          <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${r.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {r.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                {events.length === 0 ? (
                  <p className="text-gray-500">No events</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((e: any) => (
                      <div key={e._id} className="border rounded-lg p-3 hover:bg-indigo-50 transition-colors">
                        <div className="font-medium text-gray-900 truncate">{e.title}</div>
                        <div className="text-sm text-gray-500 mt-1">📅 {new Date(e.startDate).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
