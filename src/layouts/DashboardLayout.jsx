import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AuthContext from '../context/AuthContext'

export default function DashboardLayout({ role = 'student' }) {
  const items = {
    student: [
      { label: 'Dashboard', to: '/student' },
      { label: 'My Profile', to: '/student/profile' },
      { label: 'ATS Resume Analyzer', to: '/student/resume-analyzer' },
      { label: 'Available Jobs', to: '/student/jobs' },
      { label: 'My Applications', to: '/student/applications' },
      { label: 'Interview Schedule', to: '/student/interviews' },
      { label: 'Notifications', to: '/student/notifications' },
      { label: 'Placement Result', to: '/student/placements' },
      { label: 'Logout', to: '/' },

    ],
    admin: [
      { label: 'Dashboard', to: '/admin' },
      { label: 'Students', to: '/admin/students' },
      { label: 'Companies', to: '/admin/companies' },
      { label: 'Jobs', to: '/admin/jobs' },
      { label: 'Applications', to: '/admin/applications' },
      { label: 'Interviews', to: '/admin/interviews' },
      { label: 'Placements', to: '/admin/placements' },
      { label: 'Reports', to: '/admin/reports' },
      { label: 'Logout', to: '/' },
    ],
    recruiter: [
      { label: 'Dashboard', to: '/recruiter' },
      { label: 'Company Profile', to: '/recruiter/profile' },
      { label: 'Post Job', to: '/recruiter/post-job' },
      { label: 'Manage Jobs', to: '/recruiter/manage-jobs' },
      { label: 'Applicants', to: '/recruiter/applicants' },
      { label: 'Interviews', to: '/recruiter/interviews' },
      { label: 'Logout', to: '/' },
    ]
  }
  const location = useLocation()
  const { user } = useContext(AuthContext)

  return (
    <div className="d-flex">
      <div className="d-lg-none p-2">
        <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">Menu</button>
      </div>

      <div style={{ width: 250 }} className="d-none d-lg-block sidebar">
        <Sidebar items={items[role]} />
      </div>

      <div className="flex-fill p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="small muted">{role.toUpperCase()} DASHBOARD</div>
            <div className="fw-bold">{location.pathname.replace(`/${role}`, '') || '/'} </div>
          </div>
          <div className="text-end">
            <div className="small muted">{user?.name}</div>
          </div>
        </div>

        <Outlet />
      </div>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSidebar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <Sidebar items={items[role]} />
        </div>
      </div>
    </div>
  )
}
