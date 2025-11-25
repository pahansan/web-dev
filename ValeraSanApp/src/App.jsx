import { Outlet, Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logout, getUserRole, getUserEmail } from './services/api';

function Navigation() {
  const location = useLocation();
  const userRole = getUserRole();
  const userEmail = getUserEmail();
  const isAuth = isAuthenticated();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header style={{
      backgroundColor: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 24px',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/valera" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: '700' }}>
          ValeraSan
        </Link>

        {isAuth ? (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', opacity: 0.8 }}>
              📧 <strong>{userEmail}</strong> | Role: <strong>{userRole}</strong>
            </span>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                border: 'none',
                background: '#f44336',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/login" style={{ color: '#FFC107', textDecoration: 'none', fontWeight: '500' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#4CAF50', textDecoration: 'none', fontWeight: '500' }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}


export default function App() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #A264C6, #FFC107)',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: '24px 0',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      overflowX: 'hidden'
    }}>
      <Navigation />

      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '20px',
        padding: '0 16px'
      }}>
        <Outlet />
      </main>
    </div>
  );
}
