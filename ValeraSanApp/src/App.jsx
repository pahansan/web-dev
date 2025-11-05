// src/App.jsx
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header style={{ backgroundColor: '#A264C6', color: 'white', padding: '16px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', borderRadius: '16px' }}>
        <h1>ValeraSan</h1>
      </header>
      <main>
        <Outlet /> {/* ← Вот что рендерит ValeraList или ValeraStats */}
      </main>
    </div>
  );
}
