import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function AdminPage() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const ws = await fetch(`${API_URL}/api/workers`).then(r => r.json())
      setWorkers(ws.workers || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="container">
      <h2>Admin</h2>
      <div className="card">
        <p>Quick view of all workers (for agency staff). For private contact details and placement, owners should call the agency.</p>
      </div>
      {loading ? <div className="spinner" /> : (
        <table className="card" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th>Category</th>
              <th>Area</th>
              <th>Phone</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(w => (
              <tr key={w.id}>
                <td>{w.name}</td>
                <td style={{ textAlign: 'center' }}>{w.category}</td>
                <td style={{ textAlign: 'center' }}>{w.area}</td>
                <td style={{ textAlign: 'center' }}>{w.phone}</td>
                <td style={{ textAlign: 'center' }}>₹{w.expectedSalary}/day</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
