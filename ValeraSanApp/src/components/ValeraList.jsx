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
    api.getValeras().then(setValeras);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    await api.deleteValera(id);
    setValeras(prev => prev.filter(v => v.id !== id)); // если .Id в C#, то id тут верный
  };

  const filtered = valeras.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#A264C6', padding: '16px', maxWidth: '800px', margin: '0 auto', borderRadius: '16px', marginTop: '20px' }}>
      <h2 style={{ color: 'white' }}>All Valeras</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '6px', marginRight: '10px', borderRadius: '16px', border: 'none' }}
        />
        <button
          onClick={() => setShowForm(true)}
          style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '16px' }}
        >
          Create new Valera
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc', borderRadius: '16px' }}>
          <input name="name" placeholder="New name for Valera" required style={{ padding: '6px', marginRight: '10px', borderRadius: '16px', border: 'none' }} />
          <button type="submit" style={{ padding: '6px 12px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '16px' }}>
            Create
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer', borderRadius: '16px', border: 'none', backgroundColor: '#f44336', color: 'white' }}
          >
            Cancel
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '16px',
            }}
          >
            <span>
              <strong>{v.name}</strong> — [❤️ - {v.health}][🍺 - {v.mana}][🙂 - {v.happiness}][😴 - {v.tiredness}][💲 - {v.money}]
            </span>
            <button
              type="button"
              onClick={(e) => handleDelete(v.id, e)}
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
