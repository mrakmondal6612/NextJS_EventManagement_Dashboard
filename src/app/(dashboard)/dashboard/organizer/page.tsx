'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/shared/Navigation'
import { useRouter } from 'next/navigation'

interface Event {
  _id: string
  title: string
  status: string
  registeredCount: number
  capacity: number
  startDate: string
  createdAt: string
}

interface NewEvent {
  title: string
  description: string
  category: string
  startDate: string
  endDate: string
  capacity: number
  location: {
    venue: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function OrganizerDashboard() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    capacity: 0,
    location: {
      venue: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user?.role !== 'organizer') {
      router.push('/dashboard')
      return
    }

    fetchEvents()
  }, [isAuthenticated, user])

  const fetchEvents = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/events?organizerId=${user._id}`)
      const data = await response.json()
      if (data.success) {
        setEvents(data.data.events)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEvent,
          organizerId: user?._id,
          status: 'draft',
        }),
      })

      const data = await response.json()
      if (data.success) {
        setEvents([...events, data.data])
        setShowCreateForm(false)
        setNewEvent({
          title: '',
          description: '',
          category: '',
          startDate: '',
          endDate: '',
          capacity: 0,
          location: {
            venue: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
          },
        })
      }
    } catch (error) {
      console.error('Failed to create event:', error)
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
              <p className="text-gray-600">Create and manage your events</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              {showCreateForm ? 'Cancel' : 'Create Event'}
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    required
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      required
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
                      <option value="">Select Category</option>
                      <option value="Conference">Conference</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Webinar">Webinar</option>
                      <option value="Meetup">Meetup</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                    <input
                      type="number"
                      required
                      value={newEvent.capacity}
                      onChange={(e) => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="datetime-local"
                      required
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="datetime-local"
                      required
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Location</h3>
                  <div className="grid grid-cols-2 gap-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Venue"
                      value={newEvent.location.venue}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, venue: e.target.value },
                        })
                      }
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={newEvent.location.address}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, address: e.target.value },
                        })
                      }
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newEvent.location.city}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, city: e.target.value },
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newEvent.location.state}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, state: e.target.value },
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newEvent.location.zipCode}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, zipCode: e.target.value },
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={newEvent.location.country}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          location: { ...newEvent.location, country: e.target.value },
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium">
                  Create Event
                </button>
              </form>
            </div>
          )}

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b">
              <h2 className="text-2xl font-bold">Your Events</h2>
            </div>
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : events.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No events yet. Create your first event!</div>
            ) : (
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <p>📅 {new Date(event.startDate).toLocaleDateString()}</p>
                            <p>👥 {event.registeredCount}/{event.capacity} registered</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              event.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {event.status}
                          </span>
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
