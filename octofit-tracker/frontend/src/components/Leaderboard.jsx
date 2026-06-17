import { useEffect, useState } from 'react';
import { toArray } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setEntries(toArray(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.user?.username ?? e.user}</td>
              <td><span className="badge bg-success fs-6">{e.score}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
