import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function SimpleChart({data}){
  const cfg = {
    labels: data.labels,
    datasets:[{label: data.label, data: data.values, backgroundColor: 'rgba(13,110,253,0.7)'}]
  }
  return <Bar data={cfg} />
}
