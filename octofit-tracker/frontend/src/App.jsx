import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>OctoFit Tracker</h1>
        <Routes>
          <Route path="/" element={<div>Welcome to OctoFit Tracker</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
