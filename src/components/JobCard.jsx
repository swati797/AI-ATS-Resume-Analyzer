import React from 'react'
import StatusBadge from './StatusBadge'

export default function JobCard({job, onApply}){
  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1">{job.jobTitle}</h5>
          <div className="small muted">{job.companyId?.companyName} • {job.location}</div>
        </div>
        <div className="text-end">
          <div className="stat-value">{job.package || '—'}</div>
          <div className="small muted">{job.jobType}</div>
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-between align-items-center">
        <div className="small text-muted">Min CGPA: {job.minCGPA || '—'} • Deadline: {job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleDateString() : '—'}</div>
        <div>
          <StatusBadge status={job.status || 'Open'} />
          <button className="btn btn-primary btn-sm ms-2" onClick={onApply}>Apply</button>
        </div>
      </div>
    </div>
  )
}
