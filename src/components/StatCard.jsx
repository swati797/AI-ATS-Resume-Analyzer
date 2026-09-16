import React from 'react'

export default function StatCard({title,value,variant='primary'}){
  return (
    <div className="card card-stats shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <small className="text-muted">{title}</small>
          <div className="stat-value text-dark">{value}</div>
        </div>
        <div className={`badge bg-${variant} bg-opacity-10 text-${variant} py-2 px-3 rounded`}> {typeof value === 'number' ? value : ''} </div>
      </div>
    </div>
  )
}
