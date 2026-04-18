"use client"

import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export const TicketBreakdownChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    // Mock data - in production fetch from /api/metrics/tickets
    setChartData({
      labels: ['Male', 'Female', 'Other'],
      datasets: [
        {
          data: [660, 220, 0],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 2,
        },
      ],
    })
  }, [])

  if (!chartData) {
    return <div className="animate-pulse h-80 bg-gray-100 rounded"></div>
  }

  return (
    <div className="h-80">
      <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  )
}
