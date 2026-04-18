import React from 'react'
import { Navigation } from '@/components/shared/Navigation'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ChartArea } from '@/components/dashboard/ChartArea'

export default function AdminDashboard() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6">Organizer Dashboard</h1>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartArea endpoint="/api/metrics/registrations?days=7" label="Registrations (7d)" />
            <ChartArea endpoint="/api/metrics/sales?days=7" label="Revenue (7d)" />
          </div>
        </div>
      </div>
    </>
  )
}
