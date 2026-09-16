import React, { useState, useContext } from 'react'
import JobCard from '../components/JobCard'
import EmptyState from '../components/EmptyState'
import AuthContext from '../context/AuthContext'

const DUMMY = [
  { _id: 'j1', jobTitle: 'Software Engineer', companyId: { companyName: 'ABC Corp' }, location: 'City A', package: '4 LPA', minCGPA: 6.0, requiredSkills: ['JavaScript','React'], applicationDeadline: new Date(Date.now()+7*24*3600*1000).toISOString(), status: 'Open'},
  { _id: 'j2', jobTitle: 'Data Analyst', companyId: { companyName: 'XYZ Analytics' }, location: 'City B', package: '3.5 LPA', minCGPA: 5.5, requiredSkills: ['SQL','Python'], applicationDeadline: new Date(Date.now()+10*24*3600*1000).toISOString(), status: 'Open'},
  { _id: 'j3', jobTitle: 'Web Developer', companyId: { companyName: 'WebWorks' }, location: 'Remote', package: '3 LPA', minCGPA: 5.0, requiredSkills: ['HTML','CSS','JS'], applicationDeadline: new Date(Date.now()+3*24*3600*1000).toISOString(), status: 'Closed'},
]

export default function Jobs(){
  const { user } = useContext(AuthContext)
  const [jobs] = useState(DUMMY)
  const [q, setQ] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [selected, setSelected] = useState(null)

  const companies = Array.from(new Set(jobs.map(j=> j.companyId?.companyName))).filter(Boolean)
  const roles = Array.from(new Set(jobs.map(j=> j.jobTitle))).filter(Boolean)
  const locations = Array.from(new Set(jobs.map(j=> j.location))).filter(Boolean)

  const filtered = jobs.filter(j=>{
    if(q && !(j.jobTitle.toLowerCase().includes(q.toLowerCase()) || j.companyId.companyName.toLowerCase().includes(q.toLowerCase()))) return false
    if(company && j.companyId.companyName !== company) return false
    if(role && j.jobTitle !== role) return false
    if(location && j.location !== location) return false
    return true
  })

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Job Portal</h4>
        <div className="d-flex" style={{gap:8}}>
          <input className="form-control" placeholder="Search Jobs" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Filter by company</label>
          <select className="form-control" value={company} onChange={e=>setCompany(e.target.value)}>
            <option value="">All</option>
            {companies.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Filter by role</label>
          <select className="form-control" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="">All</option>
            {roles.map(r=> <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Filter by location</label>
          <select className="form-control" value={location} onChange={e=>setLocation(e.target.value)}>
            <option value="">All</option>
            {locations.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {filtered.length===0 && <EmptyState title="No jobs found" message="Try changing your filters or come back later." />}
          {filtered.map(job=> (
            <div key={job._id} className="mb-3">
              <div className="card p-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{job.jobTitle}</h5>
                    <div className="small muted">{job.companyId?.companyName} • {job.location}</div>
                    <div className="mt-2 small">Skills: {(job.requiredSkills||[]).join(', ')}</div>
                  </div>
                  <div className="text-end">
                    <div className="stat-value">{job.package}</div>
                    <div className="small muted">Min CGPA: {job.minCGPA || '—'}</div>
                    <div className="mt-2">
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={()=>setSelected(job)}>View Details</button>
                      <button className="btn btn-primary btn-sm" onClick={()=> window.location = user ? `/student/jobs/${job._id}` : '/login'}>Apply Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Quick Filters</h6>
            <div className="small muted">Companies</div>
            <ul className="list-unstyled small mt-2">
              {companies.map(c=> <li key={c}><a href="#" onClick={e=>{e.preventDefault(); setCompany(c)}}>{c}</a></li>)}
            </ul>
          </div>
        </div>
      </div>

      {selected && (
        <div className="card p-3 mt-3">
          <div className="d-flex justify-content-between">
            <div>
              <h5>{selected.jobTitle}</h5>
              <div className="small muted">{selected.companyId.companyName} • {selected.location}</div>
              <p className="muted mt-2">{selected.requiredSkills?.join(', ')}</p>
            </div>
            <div className="text-end">
              <div className="small muted">Deadline</div>
              <div><strong>{new Date(selected.applicationDeadline).toLocaleDateString()}</strong></div>
              <div className="mt-2">
                <button className="btn btn-primary me-2" onClick={()=> window.location = user ? `/student/jobs/${selected._id}` : '/login'}>Apply</button>
                <button className="btn btn-ghost" onClick={()=>setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
