import React from 'react'

export default function EmptyState({title='Nothing here', message='', action}){
  return (
    <div className="text-center p-5">
      <div style={{fontSize:48,opacity:0.08}}>📭</div>
      <h5 className="mt-3">{title}</h5>
      {message && <p className="text-muted">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
