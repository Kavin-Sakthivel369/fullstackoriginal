import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Login failed')
    } else {
      localStorage.setItem('gb_token', data.token)
      localStorage.setItem('gb_user', JSON.stringify(data.user))
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={submit} className="card" style={{ maxWidth: 420 }}>
        <div className="field"><div className="label">Username</div><input className="input" value={username} onChange={e=>setUsername(e.target.value)} required/></div>
        <div className="field"><div className="label">Password</div><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button className="button" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button>
        {message && <div style={{ marginTop: 10, color: 'crimson' }}>{message}</div>}
      </form>
    </div>
  )
}
