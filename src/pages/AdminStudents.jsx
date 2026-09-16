import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function AdminStudents(){
  const { authFetch } = useContext(AuthContext)
  const [students, setStudents] = useState([])
  const [query, setQuery] = useState('')

  const load = async ()=>{
    const res = await authFetch('/api/students')
    const data = await res.json()
    if(res.ok) setStudents(data)
  }

  useEffect(()=>{ load() },[])

  const remove = async (id)=>{
    if(!confirm('Delete student?')) return
    await authFetch('/api/students/'+id,{method:'DELETE'})
    load()
  }

  const search = ()=>{
    if(!query) return load()
    setStudents(students.filter(s=> s.userId.name.toLowerCase().includes(query.toLowerCase()) || s.enrollmentNumber?.toLowerCase().includes(query.toLowerCase())))
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Students</h4>
        <div className="d-flex">
          <input className="form-control me-2" placeholder="Search name or enrollment" value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="btn btn-primary" onClick={search}>Search</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead><tr><th>Name</th><th>Email</th><th>Enrollment</th><th>Branch</th><th>CGPA</th><th></th></tr></thead>
          <tbody>
            {students.map(s=> (
              <tr key={s._id}>
                <td>{s.userId?.name}</td>
                <td>{s.userId?.email}</td>
                <td>{s.enrollmentNumber}</td>
                <td>{s.branch}</td>
                <td>{s.cgpa}</td>
                <td><button className="btn btn-sm btn-danger" onClick={()=>remove(s._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
