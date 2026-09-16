import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand-lg py-3">
      <div className="container d-flex align-items-center">
        <Link className="site-brand" to="/">
          <div className="site-logo" aria-hidden="true"></div>
          <div>Placement Management System</div>
        </Link>

        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item"><NavLink className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'} to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'} to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'} to="/jobs">Jobs</NavLink></li>
            <li className="nav-item"><NavLink className={({isActive})=> isActive ? 'nav-link active' : 'nav-link'} to="/contact">Contact</NavLink></li>
            {!user && <li className="nav-item d-lg-inline-block d-none"><NavLink className="nav-link" to="/login">Login</NavLink></li>}
            {!user && <li className="nav-item ms-2"><NavLink className="nav-link btn btn-primary text-white px-3" to="/register">Register</NavLink></li>}
            {user && <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown">Hi, {user.name}</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li><NavLink className="dropdown-item" to={user.role === 'admin' ? '/admin' : user.role === 'recruiter' ? '/recruiter' : '/student'}>Dashboard</NavLink></li>
                <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
              </ul>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}
