import { useEffect, useState } from 'react';
import { toArray } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

const DIFFICULTY_BADGE = {
  easy: 'bg-success',
  medium: 'bg-warning text-dark',
  hard: 'bg-danger',
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setWorkouts(toArray(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {workouts.map((w) => (
          <div className="col" key={w._id}>
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <strong>{w.name}</strong>
                <span className={`badge ${DIFFICULTY_BADGE[w.difficulty] ?? 'bg-secondary'}`}>
                  {w.difficulty}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text text-muted">{w.description}</p>
                <ul className="list-unstyled mb-0">
                  {(w.exercises ?? []).map((ex, i) => (
                    <li key={i}>• {ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
