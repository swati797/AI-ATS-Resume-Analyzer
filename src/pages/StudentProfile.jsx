import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function StudentProfile(){
  const { authFetch, user } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const load = async ()=>{
      const res = await authFetch('/api/students/me/profile')
      const data = await res.json()
      if(res.ok){ setProfile(data); setForm(data) }
    }
    load()
  },[])

  const handle = e => setForm({...form,[e.target.name]: e.target.value})

  const save = async ()=>{
    setMsg('')
    const res = await authFetch('/api/students/me/profile',{method:'PUT', body: JSON.stringify(form)})
    const data = await res.json()
    if(!res.ok) return setMsg(data.message || 'Update failed')
    setProfile(data)
    setEditing(false)
    setMsg('Profile updated')
  }

  if(!profile) return <div>Loading...</div>

  // compute completion
  const fields = ['enrollmentNumber','course','branch','year','cgpa','phone','skills']
  const filled = fields.filter(f=> profile[f] && profile[f].length).length
  const completion = Math.round((filled / fields.length) * 100)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>My Profile</h4>
        <div className="text-muted">Completion: <strong>{completion}%</strong></div>
      </div>
      {msg && <div className="alert alert-info">{msg}</div>}
      {!editing ? (
        <div className="card p-3">
          <p><strong>Name:</strong> {profile.userId?.name}</p>
          <p><strong>Email:</strong> {profile.userId?.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Enrollment:</strong> {profile.enrollmentNumber}</p>
          <p><strong>Course:</strong> {profile.course}</p>
          <p><strong>Branch:</strong> {profile.branch}</p>
          <p><strong>Year:</strong> {profile.year}</p>
          <p><strong>CGPA:</strong> {profile.cgpa}</p>
          <p><strong>Backlogs:</strong> {profile.backlogs}</p>
          <p><strong>Skills:</strong> {Array.isArray(profile.skills)? profile.skills.join(', '): profile.skills}</p>
          <p><strong>Certifications:</strong> {Array.isArray(profile.certifications)? profile.certifications.join(', '): profile.certifications}</p>
          <div className="mt-3">
            <button className="btn btn-outline-primary" onClick={()=>setEditing(true)}>Edit Profile</button>
          </div>
        </div>
      ) : (
        <div className="card p-3">
          <div className="row">
            <div className="col-md-6 mb-2"><label>Name</label><input name="userId.name" value={form.userId?.name || ''} className="form-control" disabled/></div>
            <div className="col-md-6 mb-2"><label>Email</label><input name="userId.email" value={form.userId?.email || ''} className="form-control" disabled/></div>
            <div className="col-md-6 mb-2"><label>Phone</label><input name="phone" value={form.phone || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-6 mb-2"><label>Enrollment</label><input name="enrollmentNumber" value={form.enrollmentNumber || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>Course</label><input name="course" value={form.course || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>Branch</label><input name="branch" value={form.branch || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>Year</label><input name="year" value={form.year || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>CGPA</label><input name="cgpa" value={form.cgpa || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>Backlogs</label><input name="backlogs" value={form.backlogs || ''} onChange={handle} className="form-control"/></div>
            <div className="col-md-4 mb-2"><label>Skills (comma separated)</label><input name="skills" value={Array.isArray(form.skills)? form.skills.join(', '): (form.skills||'')} onChange={e=>setForm({...form, skills: e.target.value.split(',').map(s=>s.trim())})} className="form-control"/></div>
            <div className="col-12 mb-2"><label>Certifications (comma separated)</label><input name="certifications" value={Array.isArray(form.certifications)? form.certifications.join(', '):(form.certifications||'')} onChange={e=>setForm({...form, certifications: e.target.value.split(',').map(s=>s.trim())})} className="form-control"/></div>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={save}>Save</button>
            <button className="btn btn-secondary" onClick={()=>setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
