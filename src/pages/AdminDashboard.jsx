import React, { useContext, useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import SimpleChart from '../components/SimpleChart'
import AuthContext from '../context/AuthContext'

export default function AdminDashboard(){
  const { user, authFetch } = useContext(AuthContext)
  const [stats, setStats] = useState({students:0,companies:0,jobs:0,applications:0,shortlisted:0,placed:0})
  const [chartData, setChartData] = useState({labels:[], values:[], label:'Placement %'})

  useEffect(()=>{
    const load = async ()=>{
      // fetch counts
      const [sres, cres, jres, ares, pres] = await Promise.all([
        authFetch('/api/students'),
        authFetch('/api/companies'),
        authFetch('/api/jobs'),
        authFetch('/api/applications'),
        authFetch('/api/placements')
      ])
      const [sdata,cdata,jdata,adata,pdata] = await Promise.all([sres.json(), cres.json(), jres.json(), ares.json(), pres.json()])
      setStats({students: Array.isArray(sdata)? sdata.length:0, companies: Array.isArray(cdata)? cdata.length:0, jobs: Array.isArray(jdata)? jdata.filter(j=> j.status==='open').length:0, applications: Array.isArray(adata)? adata.length:0, shortlisted: Array.isArray(adata)? adata.filter(x=> x.status==='Shortlisted').length:0, placed: Array.isArray(pdata)? pdata.length:0})

      // simple chart: placements per year
      const byYear = {}
      (pdata||[]).forEach(p=>{
        const y = new Date(p.placementDate).getFullYear()
        byYear[y] = (byYear[y]||0)+1
      })
      const labels = Object.keys(byYear).sort()
      const values = labels.map(l=> byYear[l])
      setChartData({labels, values, label:'Placements'})
    }
    load()
  },[])

  const placementPercentage = stats.students ? Math.round((stats.placed / stats.students) * 1000)/10 : 0

  const statItems = [
    {title:'Total Students', value: stats.students},
    {title:'Total Companies', value: stats.companies},
    {title:'Active Jobs', value: stats.jobs},
    {title:'Total Applications', value: stats.applications},
    {title:'Shortlisted', value: stats.shortlisted},
    {title:'Students Placed', value: stats.placed},
    {title:'Placement %', value: `${placementPercentage}%`}
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Admin Dashboard</h3>
        {user && <div className="text-muted">Welcome, <strong>{user.name}</strong></div>}
      </div>
      <div className="row g-3 mt-3">
        {statItems.slice(0,6).map(s=> (<div className="col-md-4" key={s.title}><StatCard title={s.title} value={s.value} /></div>))}
      </div>

      <div className="row mt-4">
        <div className="col-md-8"><div className="card p-3 shadow-sm"><h6>Placements (by year)</h6><SimpleChart data={chartData} /></div></div>
        <div className="col-md-4"><div className="card p-3 shadow-sm"><h6>Summary</h6><p className="mb-1">Students: {stats.students}</p><p className="mb-1">Placed: {stats.placed}</p><p className="mb-0">Placement %: {placementPercentage}%</p></div></div>
      </div>
    </div>
  )
}
