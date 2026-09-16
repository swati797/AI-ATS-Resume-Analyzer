import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({children}){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('user')) }catch(e){return null}
  })
  const [token, setToken] = useState(()=> localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(()=>{
    if(user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user')
  },[user])
  useEffect(()=>{
    if(token) localStorage.setItem('token', token); else localStorage.removeItem('token')
  },[token])

  const login = (userData, jwt)=>{
    setUser(userData)
    setToken(jwt)
    // Redirect based on role
    if(userData.role === 'admin') navigate('/admin')
    else if(userData.role === 'recruiter') navigate('/recruiter')
    else navigate('/student')
  }

  const logout = ()=>{
    setUser(null)
    setToken(null)
    navigate('/login')
  }

  const authFetch = (url, options={})=>{
    const headers = options.headers || {}
    if(token) headers['Authorization'] = `Bearer ${token}`
    headers['Content-Type'] = headers['Content-Type'] || 'application/json'
    return fetch(url, {...options, headers})
  }

  return (
    <AuthContext.Provider value={{user,token,login,logout,authFetch}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
