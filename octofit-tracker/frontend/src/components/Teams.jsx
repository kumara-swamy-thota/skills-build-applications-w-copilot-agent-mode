import { useEffect, useState } from 'react';
import { API_BASE, toArray } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setTeams(toArray(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {teams.map((t) => (
          <div className="col" key={t._id}>
            <div className="card h-100">
              <div className="card-header bg-dark text-white">
                <strong>{t.name}</strong>
              </div>
              <ul className="list-group list-group-flush">
                {(t.members ?? []).map((m) => (
                  <li className="list-group-item" key={m._id ?? m}>
                    {m.username ?? m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
