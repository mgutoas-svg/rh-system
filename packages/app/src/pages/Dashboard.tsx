import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}! Role: {user?.role}</p>

      <button
        onClick={() => { logout(); navigate('/login'); }}
        style={{ marginTop: '1rem', backgroundColor: '#dc2626', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}
