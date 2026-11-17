import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: '320px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>RH System</h1>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', border: '1px solid #ddd', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', border: '1px solid #ddd', padding: '0.5rem', marginBottom: '1.5rem', borderRadius: '4px', boxSizing: 'border-box' }}
        />

        <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}
