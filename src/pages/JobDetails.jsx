import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import StatusBadge from '../components/StatusBadge'


export default function JobDetails(){
  const { id } = useParams()
  const { authFetch } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [student, setStudent] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const load = async ()=>{
      const res = await authFetch('/api/jobs/' + id)
      const data = await res.json()
      if(res.ok) setJob(data)

      // load student profile to check eligibility
      const res2 = await authFetch('/api/students/me/profile')
      const sdata = await res2.json()
      if(res2.ok) setStudent(sdata)
    }
    load()
  },[id])

  const checkEligibility = (job, student)=>{
    if(!student) return {ok:false, reason:'Student profile not loaded'}
    if(job.minimumCGPA && student.cgpa < job.minimumCGPA) return {ok:false, reason:`Requires minimum CGPA ${job.minimumCGPA}`}
    if(job.maximumBacklogs !== undefined && student.backlogs > job.maximumBacklogs) return {ok:false, reason:`Maximum allowed backlogs ${job.maximumBacklogs}`}
    if(job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) return {ok:false, reason:'Application deadline passed'}
    // requiredSkills
    if(job.requiredSkills && job.requiredSkills.length){
      const missing = job.requiredSkills.filter(s=> !(student.skills||[]).map(x=>x.toLowerCase()).includes(s.toLowerCase()))
      if(missing.length) return {ok:false, reason:`Missing skills: ${missing.join(', ')}`}
    }
    return {ok:true}
  }

  const apply = async ()=>{
    setMsg('')
    const eligibility = checkEligibility(job, student)
    if(!eligibility.ok){ setMsg(eligibility.reason); return }
    // apply
    const res = await authFetch('/api/applications/apply',{method:'POST', body: JSON.stringify({jobId: job._id})})
    const data = await res.json()
    if(!res.ok) return setMsg(data.message || 'Apply failed')
    setMsg('Applied successfully')
  }

  if(!job) return <div className="text-center py-5">Loading...</div>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h4>{job.jobTitle}</h4>
          <div className="small muted">Company: {job.companyId?.companyName} • {job.location}</div>
        </div>
        <div className="text-end">
          <StatusBadge status={job.status || 'Open'} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card p-3">
            <h6>Job Overview</h6>
            <p className="muted">{job.description}</p>
            <h6 className="mt-3">Required Skills</h6>
            <div className="small">{(job.requiredSkills||[]).join(', ') || 'Not specified'}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Details</h6>
            <div className="small muted">Minimum CGPA: <strong>{job.minimumCGPA || '—'}</strong></div>
            <div className="small muted">Backlogs allowed: <strong>{job.maximumBacklogs ?? '—'}</strong></div>
            <div className="small muted">Salary: <strong>{job.salary || '—'}</strong></div>
            <div className="small muted">Deadline: <strong>{job.applicationDeadline ? new Date(job.applicationDeadline).toLocaleString() : 'N/A'}</strong></div>
            <div className="mt-3">
              {msg && <div className="alert alert-info small">{msg}</div>}
              <button className="btn btn-primary w-100" onClick={apply}>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
