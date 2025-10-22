import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function RegisterPage() {
  const [role, setRole] = useState('worker')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Construction Worker')
  const [expectedSalary, setExpectedSalary] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, name, phone, location, category, expectedSalary: Number(expectedSalary), username, password })
    })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Failed to register')
    } else {
      setMessage('Registered successfully. You can now login.')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit} className="card" style={{ maxWidth: 520 }}>
        <div className="field">
          <div className="label">I am a</div>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="worker">Worker</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="field"><div className="label">Name</div><input className="input" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="field"><div className="label">Phone</div><input className="input" value={phone} onChange={e=>setPhone(e.target.value)} required/></div>
        <div className="field"><div className="label">Location (Area)</div><input className="input" value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. North"/></div>
        {role === 'worker' && (
          <>
            <div className="field"><div className="label">Category</div>
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option>Construction Worker</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Mason</option>
                <option>Painter</option>
                <option>Carpenter</option>
                <option>Welder</option>
                <option>Tile Setter</option>
                <option>Roofing</option>
              </select>
            </div>
            <div className="field"><div className="label">Expected Salary (per day)</div><input className="input" type="number" value={expectedSalary} onChange={e=>setExpectedSalary(e.target.value)} /></div>
          </>
        )}
        <div className="field"><div className="label">Username</div><input className="input" value={username} onChange={e=>setUsername(e.target.value)} required/></div>
        <div className="field"><div className="label">Password</div><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button className="button" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
        {message && <div style={{ marginTop: 10, color: message.includes('success') ? 'green' : 'crimson' }}>{message}</div>}
      </form>

      <div style={{ marginTop: 18 }} className="card">
        <strong>Offline Registration</strong>
        <p>
          If you do not have access to a computer or smartphone, visit our office and our staff will create an account for you with your location and salary details.
        </p>
      </div>
    </div>
  )
}
