import { Outlet } from 'react-router-dom';

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
        fontWeight: '700',
        fontSize: '28px',
        letterSpacing: '1px'
      }}>
        ValeraSan
      </header>

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
