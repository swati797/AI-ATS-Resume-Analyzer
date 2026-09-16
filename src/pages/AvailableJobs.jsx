import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import JobCard from '../components/JobCard'


export default function AvailableJobs(){
  const { authFetch } = useContext(AuthContext)
  const [jobs, setJobs] = useState([])
  const [query, setQuery] = useState('')
  const [skillFilter, setSkillFilter] = useState('')

  const load = async ()=>{
    const q = new URLSearchParams()
    if(query) q.set('q', query)
    const res = await authFetch('/api/jobs?' + q.toString())
    const data = await res.json()
    if(res.ok) setJobs(data)
  }

  useEffect(()=>{ load() },[])

  const search = async (e)=>{ e.preventDefault(); load() }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Available Jobs</h4>
        <form className="d-flex" onSubmit={search}>
          <input className="form-control me-2" placeholder="Search role or company" value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
      <div className="row gy-3">
        {jobs.length===0 && <div className="text-muted">No jobs found</div>}
        {jobs.map(job=> (
          <div className="col-md-6" key={job._id}>
            <JobCard job={job} onApply={()=> window.location = `/student/jobs/${job._id}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
