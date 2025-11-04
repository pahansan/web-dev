// src/App.jsx
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <header style={{ backgroundColor: '#333', color: 'white', padding: '16px', textAlign: 'center' }}>
        <h1>Маргинал Валера — Управление</h1>
      </header>
      <main>
        <Outlet /> {/* ← Вот что рендерит ValeraList или ValeraStats */}
      </main>
    </div>
  );
}