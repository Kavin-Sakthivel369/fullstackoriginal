export default function DashboardPage() {
  const stored = localStorage.getItem('gb_user')
  const user = stored ? JSON.parse(stored) : null

  if (!user) {
    return (
      <div className="container">
        <h2>Dashboard</h2>
        <div className="card">Please login to view your dashboard.</div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="card">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Location:</strong> {user.location}</div>
        {user.role === 'owner' && (
          <div style={{ marginTop: 10 }}>
            <a className="button" href="/workers">Find Workers</a>
          </div>
        )}
      </div>
    </div>
  )
}
