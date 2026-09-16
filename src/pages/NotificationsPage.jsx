import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function NotificationsPage(){
  const { authFetch, user } = useContext(AuthContext)
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    const load = async ()=>{
      if(!user) return
      const res = await authFetch('/api/notifications?userId=' + user.id)
      const data = await res.json()
      if(res.ok) setNotes(data)
    }
    load()
  },[user])

  const markRead = async (id)=>{
    await authFetch('/api/notifications/' + id + '/read',{method:'PUT'})
    setNotes(n=> n.map(x=> x._id===id? {...x,isRead:true}:x))
  }

  return (
    <div>
      <h4>Notifications</h4>
      {notes.length===0 && <div className="text-muted">No notifications</div>}
      <div className="list-group mt-3">
        {notes.map(n=> (
          <div key={n._id} className={`list-group-item ${n.isRead? 'bg-light':''}`}>
            <div className="d-flex justify-content-between">
              <div>
                <strong>{n.title}</strong>
                <div className="text-muted">{n.message}</div>
                <div className="text-muted small">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.isRead && <button className="btn btn-sm btn-outline-primary" onClick={()=>markRead(n._id)}>Mark read</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
