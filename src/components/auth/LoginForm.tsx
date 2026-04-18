'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoAdmin = () => {
    setFormData({ email: 'admin@roboticsevent.com', password: 'Admin123!' })
    setError('')
  }

  const fillDemoOrganizer = () => {
    setFormData({ email: 'organizer@roboticsevent.com', password: 'Organizer123!' })
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="text-4xl font-bold text-blue-600">AK</span>
            <span className="text-3xl font-semibold text-gray-800">Event</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded">
              <p className="font-bold">Success!</p>
              <p className="text-sm">{success}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Accounts Info */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-4">Demo Accounts (for testing):</p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 border border-blue-200 transition">
              <p className="font-semibold text-gray-900 text-sm">👑 Admin Account</p>
              <p className="text-xs text-gray-600">admin@roboticsevent.com</p>
            </button>
            <button
              type="button"
              onClick={fillDemoOrganizer}
              className="w-full text-left p-3 bg-white rounded-lg hover:bg-gray-50 border border-blue-200 transition">
              <p className="font-semibold text-gray-900 text-sm">✨ Organizer Account</p>
              <p className="text-xs text-gray-600">organizer@roboticsevent.com</p>
            </button>
          </div>
          <p className="text-xs text-blue-700 mt-3">Click to auto-fill. Password: Admin123! / Organizer123!</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
