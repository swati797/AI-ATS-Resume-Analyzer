import React from 'react'

export default function Card({title, children, className=''}){
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-body"><div className="card-title">{title}</div></div>}
      <div className="card-body">{children}</div>
    </div>
  )
}
