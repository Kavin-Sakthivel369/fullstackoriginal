import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function BrowseWorkersPage() {
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState(['All', 'North', 'South', 'East', 'West', 'Downtown'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All')
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const cats = await fetch(`${API_URL}/api/categories`).then(r => r.json())
      setCategories(['All', ...(cats.categories || [])])
      const ws = await fetch(`${API_URL}/api/workers`).then(r => r.json())
      setWorkers(ws.workers || [])
      setLoading(false)
    }
    load()
  }, [])

  async function applyFilters() {
    setLoading(true)
    const params = new URLSearchParams()
    if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory)
    if (selectedArea && selectedArea !== 'All') params.set('area', selectedArea)
    const ws = await fetch(`${API_URL}/api/workers?${params.toString()}`).then(r => r.json())
    setWorkers(ws.workers || [])
    setLoading(false)
  }

  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedArea])

  return (
    <div className="container">
      <h2>Browse Workers</h2>
      <div className="filters">
        <div style={{ minWidth: 240 }}>
          <div className="label">Category</div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ minWidth: 180 }}>
          <div className="label">Area</div>
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {loading ? <div className="spinner" /> : (
        <ul className="list card">
          {workers.map((w) => (
            <li key={w.id} className="list-item">
              <div>
                <div style={{ fontWeight: 700 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: '#396' }}>{w.category} • {w.area} • ₹{w.expectedSalary}/day</div>
              </div>
              <div style={{ fontWeight: 700 }}>{w.phone}</div>
            </li>
          ))}
          {!workers.length && <li className="list-item">No workers found for selected filters.</li>}
        </ul>
      )}
    </div>
  )
}
