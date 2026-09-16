import React from 'react'

export default function Button({children, variant='primary', className='', ...props}){
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'outline' ? 'btn-outline-primary' : 'btn-ghost'
  return <button className={`${cls} ${className}`} {...props}>{children}</button>
}
