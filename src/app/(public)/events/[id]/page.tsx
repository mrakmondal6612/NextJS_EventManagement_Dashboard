'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/shared/Navigation'
import { useRouter } from 'next/navigation'

interface EventDetail {
  _id: string
  title: string
  description: string
  image?: string
  startDate: string
  endDate: string
  category: string
  status: string
  registeredCount: number
  capacity: number
  location: {
    venue: string
    address: string
    city: string
    state: string
    country: string
  }
  organizerId: {
    firstName: string
    lastName: string
    email: string
  }
}

interface Ticket {
  _id: string
  name: string
  description?: string
  type: 'free' | 'paid'
  price: number
  quantity: number
  quantitySold: number
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<string>('')
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    fetchEvent()
    fetchTickets()
  }, [params.id])

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setEvent(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTickets = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}/tickets`)
      const data = await response.json()
      if (data.success) {
        setTickets(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error)
    }
  }

  const handleRegister = async () => {
    if (!isAuthenticated || !user) {
      router.push('/login')
      return
    }

    if (!selectedTicket) {
      alert('Please select a ticket')
      return
    }

    setIsRegistering(true)

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: params.id,
          userId: user._id,
          ticketId: selectedTicket,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      })

      const data = await response.json()

      if (data.success) {
        alert('Successfully registered for the event!')
        router.push('/dashboard')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Failed to register. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setIsRegistering(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-gray-500">Event not found</p>
        </div>
      </>
    )
  }

  const spotsAvailable = event.capacity - event.registeredCount
  const isSoldOut = spotsAvailable <= 0

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Event Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {event.image && (
              <div className="relative h-80 w-full bg-gray-200">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="px-6 py-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                  <div className="flex gap-2">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isSoldOut
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                      {isSoldOut ? 'Sold Out' : `${spotsAvailable} spots available`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pt-8 border-t">
                <div>
                  <p className="text-gray-600 text-sm mb-1">START DATE</p>
                  <p className="font-bold">{new Date(event.startDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{new Date(event.startDate).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">END DATE</p>
                  <p className="font-bold">{new Date(event.endDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{new Date(event.endDate).toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">VENUE</p>
                  <p className="font-bold">{event.location.venue}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">LOCATION</p>
                  <p className="font-bold">
                    {event.location.city}, {event.location.state}
                  </p>
                </div>
              </div>

              {/* Registration Stats */}
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Registered</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {event.registeredCount}/{event.capacity}
                    </p>
                  </div>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(event.registeredCount / event.capacity) * 100}%`,
                      }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md px-6 py-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
          </div>

          {/* Organizer Info */}
          <div className="bg-white rounded-lg shadow-md px-6 py-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Organizer</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {event.organizerId.firstName.charAt(0)}
                {event.organizerId.lastName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-lg">
                  {event.organizerId.firstName} {event.organizerId.lastName}
                </p>
                <p className="text-gray-600">{event.organizerId.email}</p>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          {tickets.length > 0 && (
            <div className="bg-white rounded-lg shadow-md px-6 py-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Select Ticket</h2>
              <div className="space-y-4 mb-8">
                {tickets.map((ticket) => (
                  <label
                    key={ticket._id}
                    className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors"
                    style={{
                      borderColor: selectedTicket === ticket._id ? '#4f46e5' : '#e5e7eb',
                      backgroundColor:
                        selectedTicket === ticket._id ? '#f0f4ff' : 'transparent',
                    }}>
                    <input
                      type="radio"
                      name="ticket"
                      value={ticket._id}
                      checked={selectedTicket === ticket._id}
                      onChange={(e) => setSelectedTicket(e.target.value)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-bold">{ticket.name}</p>
                      {ticket.description && (
                        <p className="text-sm text-gray-600">{ticket.description}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        Available: {ticket.quantity - ticket.quantitySold}/{ticket.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">
                        {ticket.type === 'free' ? 'FREE' : `$${ticket.price.toFixed(2)}`}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleRegister}
                disabled={isSoldOut || isRegistering || !selectedTicket}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                {isRegistering ? 'Registering...' : isSoldOut ? 'Sold Out' : 'Register Now'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
