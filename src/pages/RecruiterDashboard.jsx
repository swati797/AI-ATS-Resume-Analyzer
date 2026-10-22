import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import AuthContext from '../context/AuthContext'

export default function RecruiterDashboard() {
  const { user } = useContext(AuthContext)

  const stats = [
    { title: 'Active Jobs', value: 8 },
    { title: 'Total Applicants', value: 210 },
    { title: 'Shortlisted', value: 25 },
    { title: 'Selected Candidates', value: 12 }
  ]

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h3 className="fw-bold">Recruiter Dashboard</h3>
          <p className="text-muted">
            Manage job postings and track candidate applications.
          </p>
        </div>

        <div className="text-muted">
          Welcome, <strong>{user?.name || 'Recruiter'}</strong>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-3 mt-2">
        {stats.map((item) => (
          <div className="col-md-6 col-xl-3" key={item.title}>
            <StatCard title={item.title} value={item.value} />
          </div>
        ))}
      </div>

      {/* Recruiter actions */}
      <div className="row g-3 mt-3">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h5 className="fw-bold">Job Management</h5>
            <p className="text-muted">
              Create job opportunities and manage your existing job posts.
            </p>
            <div>
              <Link to="/recruiter/post-job" className="btn btn-primary">
                + Post a Job
              </Link>
            </div>
            <div className="mt-3">
              <Link to="/recruiter/manage-jobs">
                View and Manage Jobs →
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h5 className="fw-bold">Candidate Recruitment</h5>
            <p className="text-muted">
              Review applicants and find suitable candidates for your jobs.
            </p>
            <div>
              <Link to="/recruiter/applicants" className="btn btn-outline-primary">
                View Applicants
              </Link>
            </div>
            <div className="mt-3">
              <Link to="/recruiter/interviews">
                Manage Interviews →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="card shadow-sm p-4 mt-4">
        <h5 className="fw-bold">Recruitment Overview</h5>
        <p className="text-muted mb-0">
          Track job openings, review applications, shortlist candidates,
          and manage your recruitment process from one place.
        </p>
      </div>
    </div>
  )
}