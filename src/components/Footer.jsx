import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-md-4">
            <h5 className="mb-1">Placement Management System</h5>
            <p className="small text-muted mb-0">© 2026 Placement Management System</p>
          </div>
          <div className="col-md-4 text-md-center">
            <div className="small">
              <a href="/about">About</a>
              <span className="mx-2">•</span>
              <a href="/contact">Contact</a>
              <span className="mx-2">•</span>
              <a href="/">Privacy Policy</a>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <p className="small text-muted mb-0">Campus Career Portal</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
