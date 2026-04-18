'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

export const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg fade-in">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold btn-hover">
          <span className="text-3xl font-bold text-blue-600">AK</span>
          <span className="text-xl font-semibold text-gray-800">Event</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link 
            href="/events" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Events
          </Link>

          {isAuthenticated && user ? (
            <>
              {user.role === 'organizer' || user.role === 'admin' ? (
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  {user.role === 'admin' ? 'Admin Panel' : 'Organizer'}
                </Link>
              ) : null}
              
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                My Dashboard
              </Link>

              <div className="relative group">
                <button 
                  className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition-colors"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {user.firstName} {user.lastName}
                </button>
                <div className={`absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg ${isDropdownOpen ? 'block' : 'hidden'} group-hover:block`}>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1">
                      {user.role === 'admin' ? 'Admin Account' : user.role === 'organizer' ? 'Organizer Account' : 'User Account'}
                    </p>
                  </div>
                  <Link 
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 border-t border-gray-100">
                    🚪 Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold btn-hover hover:bg-blue-700 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
