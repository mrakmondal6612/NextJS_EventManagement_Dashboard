"use client"

import React from 'react'
import Link from 'next/link'

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-inner min-h-screen px-4 py-6">
      <div className="mb-8">
        <div className="text-2xl font-bold text-indigo-600">AK</div>
        <div className="text-sm font-semibold">Event</div>
      </div>

      <nav className="space-y-2">
        <Link href="/dashboard" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium">
          Dashboard
        </Link>
        <Link href="/events" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
          All Events
        </Link>
        <Link href="/dashboard/events" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
          Manage Events
        </Link>
        <Link href="/dashboard/analytics" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
          Analytics
        </Link>
        <Link href="/dashboard/settings" className="block px-3 py-2 rounded-lg hover:bg-gray-50">
          Settings
        </Link>
      </nav>

      <div className="mt-8 border-t pt-4 text-sm text-gray-600">
        <div className="mb-2">Quick Links</div>
        <Link href="/profile" className="block hover:underline">Account</Link>
      </div>
    </aside>
  )
}
