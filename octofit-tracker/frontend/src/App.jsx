import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">🐙 OctoFit Tracker</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              {[
                { to: '/users', label: 'Users' },
                { to: '/activities', label: 'Activities' },
                { to: '/teams', label: 'Teams' },
                { to: '/leaderboard', label: 'Leaderboard' },
                { to: '/workouts', label: 'Workouts' },
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center py-5">
              <h1>Welcome to OctoFit Tracker 🐙</h1>
              <p className="lead text-muted">Track activities, manage teams, and compete on the leaderboard.</p>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

