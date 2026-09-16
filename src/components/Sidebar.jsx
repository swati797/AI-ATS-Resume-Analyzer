import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({items}){
  return (
    <div className="sidebar p-3">
      <ul className="nav flex-column">
        {items.map(i=> (
          <li className="nav-item" key={i.label}>
            <NavLink className={({isActive})=>"nav-link text-dark py-2 d-flex justify-content-between align-items-center " + (isActive? 'active fw-semibold':'' )} to={i.to}>
              <span>{i.label}</span>
              <span className="text-muted small">&nbsp;</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
