"use client"

"use client"

import React, { useEffect, useState } from 'react'

interface Stat {
  label: string
  value: string | number
  accent?: string
}

export const StatsCards: React.FC<{ stats?: Stat[] }> = ({ stats: initialStats }) => {
  const [stats, setStats] = useState<Stat[] | null>(initialStats || null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!initialStats) {
      setLoading(true)
      fetch('/api/metrics/summary')
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setStats([
              { label: 'Total Events', value: data.totalEvents || 0 },
              { label: 'Total Attendees', value: data.totalRegistrations || 0 },
              { label: 'Total Revenue', value: `$${(data.totalRevenue || 0).toLocaleString()}` },
            ])
          }
        })
        .catch((err) => console.error('Failed to load stats:', err))
        .finally(() => setLoading(false))
    }
  }, [initialStats])

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-10 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-indigo-50">
            <span className="text-indigo-600 font-bold text-xl">{s.label.charAt(0)}</span>
          </div>
          <div>
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className={`text-2xl font-extrabold mt-1 ${s.accent || 'text-gray-900'}`}>{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
