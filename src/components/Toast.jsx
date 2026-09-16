import React from 'react'

export default function Toast({children, type='info'}){
  const cls = type==='success' ? 'alert-success' : type==='danger' ? 'alert-danger' : 'alert-info'
  return (
    <div className={`alert ${cls}`} role="alert" style={{position:'fixed',right:20,top:20,zIndex:1060}}>
      {children}
    </div>
  )
}
