import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BrowseWorkersPage from './pages/BrowseWorkersPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workers" element={<BrowseWorkersPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
