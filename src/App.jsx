import ResumeAnalyzer from './pages/ResumeAnalyzer';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentRegistration from './pages/StudentRegistration'

import StudentDashboard from './pages/StudentDashboard'
import StudentProfile from './pages/StudentProfile'
import AvailableJobs from './pages/AvailableJobs'
import JobDetails from './pages/JobDetails'
import MyApplications from './pages/MyApplications'
import Interviews from './pages/Interviews'
import NotificationsPage from './pages/NotificationsPage'
import PlacementResult from './pages/PlacementResult'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RecruiterLogin from './pages/RecruiterLogin'
import RecruiterDashboard from './pages/RecruiterDashboard'
import AdminStudents from './pages/AdminStudents'
import AdminCompanies from './pages/AdminCompanies'
import AdminJobs from './pages/AdminJobs'
import AdminApplications from './pages/AdminApplications'
import AdminInterviews from './pages/AdminInterviews'
import AdminPlacements from './pages/AdminPlacements'
import AdminReports from './pages/AdminReports'
import Jobs from './pages/Jobs'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="student-register" element={<StudentRegistration />} />
        </Route>

        <Route path="/student" element={<ProtectedRoute roles={["student"]}><DashboardLayout role="student" /></ProtectedRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="jobs" element={<AvailableJobs />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="placements" element={<PlacementResult />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
        </Route>

        <Route path="/jobs" element={<MainLayout />}>
          <Route index element={<Jobs />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
        </Route>

        <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><DashboardLayout role="admin" /></ProtectedRoute>}>
          <Route path="login" element={<AdminLogin />} />
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="interviews" element={<AdminInterviews />} />
          <Route path="placements" element={<AdminPlacements />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/recruiter" element={<ProtectedRoute roles={["recruiter"]}><DashboardLayout role="recruiter" /></ProtectedRoute>}>
          <Route path="login" element={<RecruiterLogin />} />
          <Route index element={<RecruiterDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
