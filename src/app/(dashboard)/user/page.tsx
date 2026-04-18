"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/shared/Navigation'
import { useRouter } from 'next/navigation'

interface Registration {
  _id: string
  eventId: { title: string }
  status: string
  paidAmount: number
  createdAt: string
}

export default function UserDashboard() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    fetchRegistrations()
  }, [isAuthenticated, user])

  const fetchRegistrations = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/registrations?userId=${user._id}`)
      const data = await response.json()
      if (data.success) {
        setRegistrations(data.data.registrations)
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome, {user.firstName}!</h1>
            <p className="text-gray-600">Manage your events and registrations</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">REGISTERED EVENTS</p>
              <p className="text-3xl font-bold text-indigo-600">{registrations.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">TOTAL SPENT</p>
              <p className="text-3xl font-bold text-indigo-600">
                ${registrations.reduce((sum, r) => sum + r.paidAmount, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-2">UPCOMING EVENTS</p>
              <p className="text-3xl font-bold text-indigo-600">
                {registrations.filter((r) => r.status === 'confirmed').length}
              </p>
            </div>
          </div>

          {/* Registrations List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b">
              <h2 className="text-2xl font-bold">My Registrations</h2>
            </div>
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : registrations.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No registrations yet. <a href="/events" className="text-indigo-600 hover:underline">
                  Browse events
                </a>
              </div>
            ) : (
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {registrations.map((reg) => (
                    <div key={reg._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{reg.eventId.title}</h3>
                          <p className="text-sm text-gray-600">
                            Registered on {new Date(reg.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              reg.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {reg.status}
                          </span>
                          <p className="text-lg font-bold text-indigo-600 mt-2">
                            ${reg.paidAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
