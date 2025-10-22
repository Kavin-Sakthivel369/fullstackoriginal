import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Hire Trusted Construction Workers</h1>
        <p>Owners can quickly browse workers by trade and area. Workers can register with location and expected salary. Our agency coordinates calls and schedules.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <Link to="/workers" className="button">Browse Workers</Link>
          <Link to="/register" className="button secondary">Register as Worker/Owner</Link>
        </div>
      </div>

      <div style={{ marginTop: 18 }} className="grid">
        <div className="card">
          <h3>Simple Discovery</h3>
          <p>Filter by category and area to quickly get a shortlist. We display only name and phone.</p>
        </div>
        <div className="card">
          <h3>Agency-Assisted</h3>
          <p>Owners call the agency to finalize details like schedule and salary.</p>
        </div>
        <div className="card">
          <h3>Online or Offline</h3>
          <p>Registrations can be submitted online or at our office for those without computers.</p>
        </div>
      </div>
    </div>
  )
}
