"use client"

import React from 'react'

export const WeatherCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-200 to-orange-300 rounded-lg shadow-md p-6 text-white">
      <div className="text-right">
        <div className="text-sm opacity-80">Today</div>
        <div className="text-6xl font-bold">26°C</div>
        <div className="text-sm opacity-80">Cloudy</div>
      </div>
      <div className="mt-4 text-sm">
        📍 Jakarta, Indonesia
      </div>
    </div>
  )
}
