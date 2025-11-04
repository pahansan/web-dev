// src/components/ValeraList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ValeraList() {
  const [valeras, setValeras] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getValeras().then(setValeras);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    if (!name) return;

    const newValera = {
      name,
      state: {
        health: 100,
        mana: 0,
        happiness: 0,
        tiredness: 0,
        money: 0,
      },
    };

    await api.createValera(newValera);
    form.reset();
    setShowForm(false);
    api.getValeras().then(setValeras); // обновить список
  };

  const filtered = valeras.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Список Валер</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Поиск по имени"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '6px', marginRight: '10px' }}
        />
        <button
          onClick={() => setShowForm(true)}
          style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Создать Валеру
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc' }}>
          <input name="name" placeholder="Имя Валеры" required style={{ padding: '6px', marginRight: '10px' }} />
          <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
            Создать
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer' }}
          >
            Отмена
          </button>
        </form>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(v => (
          <li
            key={v.id}
            onClick={() => navigate(`/valera/${v.id}`)}
            style={{
              padding: '12px',
              margin: '6px 0',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              cursor: 'pointer',
            }}
          >
            <strong>{v.name}</strong> — 💰{v.money} | 🍺{v.mana} | 😴{v.tiredness}
          </li>
        ))}
      </ul>
    </div>
  );
}