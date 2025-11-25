import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, setToken } from '../services/api';

export default function AuthForm({ isLogin = false }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      let tokenData;
      if (isLogin) {
        tokenData = await api.login(data.email, data.password);
      } else {
        await api.register(data.username, data.email, data.password);
        tokenData = await api.login(data.email, data.password);
      }
      setToken(tokenData.token);
      navigate('/valera');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#4CAF50',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '32px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      color: 'white',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '28px' }}>
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {error && (
        <div style={{
          background: 'rgba(244,67,54,0.3)',
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Username</label>
            <input
              name="username"
              required
              style={inputStyle}
              placeholder="Enter username"
            />
          </>
        )}

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
        <input
          name="email"
          type="email"
          required
          style={inputStyle}
          placeholder="Enter email"
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
        <input
          name="password"
          type="password"
          required
          style={inputStyle}
          placeholder="Enter password"
        />

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link
          to={isLogin ? '/register' : '/login'}
          style={{ color: '#FFC107', textDecoration: 'none', fontWeight: '500' }}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Link>
      </div>
    </div>
  );
}
