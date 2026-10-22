import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="site-logo" style={{width:30,height:30,borderRadius:8}} aria-hidden="true"></div>
              <h6 className="mb-0">Placement Management System</h6>
            </div>
            <p className="small text-muted mb-0">Empowering Students | Building Better Futures</p>
          </div>
          <div className="col-md-4 text-md-center">
            <div className="small d-flex flex-wrap justify-content-md-center gap-3">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="col-md-4 text-md-end">
            <p className="small text-muted mb-0">© {new Date().getFullYear()} Placement Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
