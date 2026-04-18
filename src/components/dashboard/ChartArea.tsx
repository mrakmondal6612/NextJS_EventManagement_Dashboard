"use client"

import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const ChartArea: React.FC<{ endpoint: string; label: string }> = ({ endpoint, label }) => {
  const [labels, setLabels] = useState<string[]>([])
  const [dataPoints, setDataPoints] = useState<number[]>([])

  useEffect(() => {
    fetch(endpoint)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          const items = d.data
          setLabels(items.map((i: any) => i._id))
          setDataPoints(items.map((i: any) => i.count || i.revenue || 0))
        }
      })
      .catch((e) => console.error('Chart fetch error', e))
  }, [endpoint])

  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataPoints,
        fill: true,
        backgroundColor: 'rgba(99,102,241,0.1)',
        borderColor: 'rgba(99,102,241,1)',
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Line data={data} />
    </div>
  )
}
