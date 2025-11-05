import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const randomName = () => {
  const names = ['Valik', 'Vanya', 'Slava', 'Misha', 'Kolya', 'Oleg', 'Dima', 'Sasha'];
  return names[Math.floor(Math.random() * names.length)];
};

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
    setFormValues(prev => ({ ...prev, [field]: Number(value) }));

  const randomValera = async () => {
    const randomValues = {
      health: Math.floor(Math.random() * 101),
      mana: Math.floor(Math.random() * 101),
      happiness: Math.floor(Math.random() * 21) - 10,
      tiredness: Math.floor(Math.random() * 101),
      money: Math.floor(Math.random() * 1001),
    };
    const name = randomName();
    await api.createValera({ name, state: randomValues });
    api.getValeras().then(setValeras);
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
    setValeras(prev => prev.filter(v => v.id !== id));
  };

  const filtered = valeras.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderSlider = (label, field, min, max, step) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: '500' }}>
        <span>{label}</span>
        <span>{formValues[field]}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={formValues[field]}
        onChange={e => updateField(field, e.target.value)}
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          background: 'linear-gradient(90deg, #673AB7 0%, #FFC107 100%)',
          outline: 'none',
          cursor: 'pointer'
        }}
      />
    </div>
  );

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: '0.2s',
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    color: 'white',
    marginBottom: '20px'
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #A264C6, #FFC107)', padding: '24px', maxWidth: '800px', margin: '40px auto', borderRadius: '20px', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '24px', textAlign: 'center', fontSize: '28px', fontWeight: '700', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>All Valeras</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <input
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '12px',
            border: 'none',
            marginRight: '12px',
            fontSize: '14px'
          }}
        />
        <button
          onClick={() => setShowForm(true)}
          style={{ ...buttonStyle, background: '#4CAF50', color: 'white' }}
        >
          Create Valera
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={formContainerStyle}>
          <div style={{ marginBottom: '16px' }}>
            <label>Name: </label>
            <input
              name="name"
              defaultValue="Valera"
              style={{
                marginLeft: '12px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                width: '180px',
                fontWeight: '500'
              }}
            />
          </div>

          {renderSlider('Health', 'health', 0, 100, 10)}
          {renderSlider('Mana', 'mana', 0, 100, 10)}
          {renderSlider('Happiness', 'happiness', -10, 10, 1)}
          {renderSlider('Tiredness', 'tiredness', 0, 100, 10)}
          {renderSlider('Money', 'money', 0, 1000, 100)}

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={randomValera}
              style={{ ...buttonStyle, background: '#673AB7', color: 'white' }}
            >
              🎲 Random Valera
            </button>
            <button
              type="submit"
              style={{ ...buttonStyle, background: '#2196F3', color: 'white' }}
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ ...buttonStyle, background: '#f44336', color: 'white' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(v => (
          <li
            key={v.id}
            onClick={() => navigate(`/valera/${v.id}`)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.1)',
              padding: '14px 20px',
              marginBottom: '12px',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              transition: '0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{ fontWeight: '600' }}>
              <strong>{v.name}</strong> — [❤️ {v.health}][🍺 {v.mana}][🙂 {v.happiness}][😴 {v.tiredness}][💲 {v.money}]
            </span>
            <button
              type="button"
              onClick={e => handleDelete(v.id, e)}
              style={{
                ...buttonStyle,
                background: '#f44336',
                color: 'white',
                fontSize: '14px'
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
