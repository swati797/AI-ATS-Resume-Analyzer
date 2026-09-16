import React from 'react'

export default function StatusBadge({status}){
  const s = (status||'').toLowerCase()
  const cls = s.includes('select') ? 'badge-success' : s.includes('rej') ? 'badge-danger' : s.includes('short') || s.includes('under') ? 'badge-warning' : 'badge-info'
  return <span className={`badge ${cls}`}>{status}</span>
}
