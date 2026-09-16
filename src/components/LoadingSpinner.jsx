import React from 'react'

export default function LoadingSpinner({size=36}){
  return (
    <div style={{width:size,height:size,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
      <div className="spinner-border text-primary" role="status" style={{width:size,height:size}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
