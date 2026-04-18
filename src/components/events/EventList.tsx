'use client'

import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface Event {
  _id: string
  title: string
  description: string
  image?: string
  startDate: string
  location: {
    city: string
    venue: string
  }
  registeredCount: number
  capacity: number
  category: string
}

interface EventListProps {
  events: Event[]
  isLoading?: boolean
  onPageChange?: (page: number) => void
  currentPage?: number
  totalPages?: number
}

export const EventList: React.FC<EventListProps> = ({
  events,
  isLoading = false,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full rotate"></div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 fade-in">
        <p className="text-gray-500 text-lg">🤖 No events found. Check back soon!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <Link key={event._id} href={`/events/${event._id}`}>
            <div 
              className="bg-white rounded-lg shadow-md card-hover h-full overflow-hidden fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {event.image && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p>📅 {formatDate(new Date(event.startDate))}</p>
                  <p>📍 {event.location.venue}, {event.location.city}</p>
                  <div className="flex items-center gap-2">
                    <p>👥 {event.registeredCount}/{event.capacity}</p>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {event.registeredCount >= event.capacity ? (
                    <span className="text-red-600 font-bold text-sm">🔴 Sold Out</span>
                  ) : (
                    <span className="text-green-600 font-bold text-sm">
                      ✅ {event.capacity - event.registeredCount} spots left
                    </span>
                  )}
                  <span className="text-indigo-600 font-bold">View →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12 fade-in">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                page === currentPage
                  ? 'bg-indigo-600 text-white glow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 btn-hover'
              }`}>
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
