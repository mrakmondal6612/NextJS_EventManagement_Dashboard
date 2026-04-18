'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 fade-in">
            AKEvent
          </h1>
          <p className="text-2xl mb-8 text-blue-100 slide-in-left" style={{ animationDelay: '0.3s' }}>
            Discover, manage, and connect at amazing events worldwide
          </p>
          <div className="flex gap-4 justify-center slide-in-right" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/events"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold btn-hover shadow-lg hover:shadow-xl transition-all">
              Explore Events
            </Link>
            <Link
              href="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold btn-hover hover:bg-white hover:text-blue-600 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Events Hosted' },
              { number: '50K+', label: 'Attendees' },
              { number: '100+', label: 'Organizations' },
              { number: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 fade-in">Why Choose AKEvent?</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Premier platform for managing events of all kinds</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Easy Event Creation',
                description: 'Create professional events in minutes with our intuitive tools. Conferences, workshops, seminars, and more.'
              },
              {
                icon: '📊',
                title: 'Live Analytics',
                description: 'Real-time tracking of registrations, attendance, and engagement with actionable insights.'
              },
              {
                icon: '🌍',
                title: 'Global Reach',
                description: 'Connect with attendees worldwide. Multi-timezone support and international payment processing.'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Bank-level security for your data. Secure transactions and international compliance standards.'
              },
              {
                icon: '🤝',
                title: 'Networking Tools',
                description: 'Built-in features for attendees to connect, collaborate, and engage before and after events.'
              },
              {
                icon: '📱',
                title: 'Fully Responsive',
                description: 'Perfect experience on all devices. Manage events and register from anywhere, anytime.'
              },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-xl shadow-md card-hover fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-4 fade-in">Featured Events</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Explore the most exciting events happening now</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Annual Tech Conference 2026',
                date: 'May 15-17, 2026',
                location: 'San Francisco',
                attendees: '500+',
                image: '🎯'
              },
              {
                title: 'Digital Marketing Summit',
                date: 'June 10-12, 2026',
                location: 'Mountain View',
                attendees: '1200+',
                image: '📱'
              },
              {
                title: 'Web Development Workshop',
                date: 'May 28, 2026',
                location: 'Chicago',
                attendees: '2000+',
                image: '💻'
              },
            ].map((event, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl card-hover fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="text-6xl mb-4">{event.image}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📅 {event.date}</p>
                  <p>📍 {event.location}</p>
                  <p>👥 {event.attendees} attendees</p>
                </div>
                <Link href="/events" className="text-blue-600 font-bold hover:text-blue-700">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center fade-in">
          <h2 className="text-4xl font-bold mb-6">Ready to Host Your Event?</h2>
          <p className="text-lg mb-10 text-blue-100">
            Join thousands of organizers who trust AKEvent
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold btn-hover hover:shadow-xl transition-all text-lg">
              Create Your Event
            </Link>
            <Link
              href="/events"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold btn-hover hover:bg-white hover:text-blue-600 transition-all text-lg">
              Discover Events
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">AKEvent</h3>
              <p>Making event management simple and accessible for everyone.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/events" className="hover:text-white">Discover Events</Link></li>
                <li><Link href="/register" className="hover:text-white">Create Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2026 AKEvent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
