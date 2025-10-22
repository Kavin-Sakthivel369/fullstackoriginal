import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  const stored = localStorage.getItem('gb_user')
  const user = stored ? JSON.parse(stored) : null

  function logout() {
    localStorage.removeItem('gb_user')
    localStorage.removeItem('gb_token')
    navigate('/')
  }

  return (
    <div className="navbar">
      <div className="container row">
        <Link className="brand" to="/">GreenBuild Agency</Link>
        <Link to="/workers">Find Workers</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
        <div className="spacer" />
        {user ? (
          <>
            <Link to="/dashboard">Hi, {user.name}</Link>
            <button className="button" onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>
    </div>
  )
}
