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

  const defaultValues = {
    health: 100,
    mana: 0,
    happiness: 0,
    tiredness: 0,
    money: 1000,
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const updateField = (field, value) =>
    setFormValues((prev) => ({ ...prev, [field]: Number(value) }));

  const randomValera = () => {
    setFormValues({
      health: Math.floor(Math.random() * 101),          // 0-100
      mana: Math.floor(Math.random() * 101),            // 0-100
      happiness: Math.floor(Math.random() * 21) - 10,   // -10..10
      tiredness: Math.floor(Math.random() * 101),       // 0-100
      money: Math.floor(Math.random() * 1001),          // 0-1000
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;

    await api.createValera({
      name: form.name.value.trim() || "Valera",
      state: formValues,
    });

    setShowForm(false);
    setFormValues(defaultValues);
    form.reset();
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
        <form
          onSubmit={handleCreate}
          style={{ marginBottom: '20px', padding: '12px', border: '1px solid #ccc', borderRadius: '16px' }}
        >

          <label style={{ color: 'white', marginRight: '8px' }}>Name:</label>
          <input
            name="name"
            defaultValue="Valera"
            style={{ padding: '6px', borderRadius: '8px', border: 'none', width: '200px' }}
          />

          <div style={{ marginTop: '12px' }}>
            <label style={{ color: 'white' }}>Health:</label>
            <input type="range" min="0" max="100" step="10"
              value={formValues.health}
              onChange={e => updateField("health", e.target.value)}
              style={{ width: '200px' }}
            />
            <label style={{ color: 'white' }}>{formValues.health}</label>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ color: 'white' }}>Mana:</label>
            <input type="range" min="0" max="100" step="10"
              value={formValues.mana}
              onChange={e => updateField("mana", e.target.value)}
              style={{ width: '200px' }}
            />
            <label style={{ color: 'white' }}>{formValues.mana}</label>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ color: 'white' }}>Happiness: </label>
            <input type="range" min="-10" max="10" step="1"
              value={formValues.happiness}
              onChange={e => updateField("happiness", e.target.value)}
              style={{ width: '200px' }}
            />
            <label style={{ color: 'white' }}>{formValues.happiness}</label>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ color: 'white' }}>Tiredness:</label>
            <input type="range" min="0" max="100" step="10"
              value={formValues.tiredness}
              onChange={e => updateField("tiredness", e.target.value)}
              style={{ width: '200px' }}
            />
            <label style={{ color: 'white' }}>{formValues.tiredness}</label>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ color: 'white' }}>Money:</label>
            <input type="range" min="0" max="1000" step="100"
              value={formValues.money}
              onChange={e => updateField("money", e.target.value)}
              style={{ width: '200px' }}
            />
            <label style={{ color: 'white' }}>{formValues.money}</label>
          </div>

          <button
            type="button"
            onClick={randomValera}
            style={{ marginTop: '12px', marginRight: '10px', padding: '6px 12px', background: '#673AB7', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '16px' }}
          >
            🎲 Random Valera
          </button>

          <button
            type="submit"
            style={{ padding: '6px 12px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '16px' }}
          >
            Create
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: '10px', padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '16px' }}
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
