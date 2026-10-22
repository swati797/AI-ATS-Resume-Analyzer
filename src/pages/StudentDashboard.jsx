import React, { useContext } from 'react'
import StatCard from '../components/StatCard'
import SimpleChart from '../components/SimpleChart'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  const { user } = useContext(AuthContext)
  const stats = [
    { title: 'Profile Completion', value: '80%' },
    { title: 'Available Jobs', value: 42 },
    { title: 'Applications', value: 7 },
    { title: 'Shortlisted', value: 2 },
    { title: 'Interviews', value: 1 },
    { title: 'Placement Status', value: 'Not Placed' }
  ]

  const chartData = { labels: ['Jan', 'Feb', 'Mar', 'Apr'], values: [5, 9, 7, 12], label: 'Applications' }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Student Dashboard</h3>
        {user && <div className="text-muted">Welcome, <strong>{user.name}</strong></div>}
      </div>
      <div className="row g-3 mt-3">
        {stats.map(s => (
          <div className="col-md-4" key={s.title}><StatCard title={s.title} value={s.value} /></div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm"><h6>Applications Trend</h6><SimpleChart data={chartData} /></div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm"><h6>Quick Links</h6>

          </div>
        </div>
      </div>
    </div>
  )
}
