import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function ProgressBar({ label, value, min = 0, max = 100, color = '#4CAF50', isCentered = false }) {
  if (!isCentered) {
    const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    return (
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>
          <span>{label}</span>
          <span>{value}</span>
        </div>
        <div style={{ height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{
            width: `${percent}%`,
            height: '100%',
            background: color,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    );
  } else {
    const percent = ((value - min) / (max - min)) * 100;
    const center = 50;
    let leftPercent = 0, rightPercent = 0;

    if (percent < center) leftPercent = center - percent;
    else rightPercent = percent - center;

    return (
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '500', fontSize: '14px', marginBottom: '6px' }}>
          <span>{label}</span>
          <span>{value}</span>
        </div>
        <div style={{ height: '14px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: `${50 - leftPercent}%`,
            width: `${leftPercent}%`,
            height: '100%',
            background: '#F44336',
            transition: 'width 0.3s ease, left 0.3s ease'
          }} />
          <div style={{
            position: 'absolute',
            left: '50%',
            width: `${rightPercent}%`,
            height: '100%',
            background: '#FFC107',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    );
  }
}

export default function ValeraStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valera, setValera] = useState(null);

  useEffect(() => {
    loadValera();
  }, [id]);

  const loadValera = () => api.getValeraById(id).then(setValera);

  const doAction = async (action) => {
    try {
      await api.performAction(id, action);
      loadValera();
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (!valera) return <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>Загрузка...</div>;

  const canWork = valera.mana < 50 && valera.tiredness < 10;

  const actions = [
    { key: 'gowork', label: 'Go work', disabled: !canWork },
    { key: 'lookfornature', label: 'Look for nature' },
    { key: 'drinkwineandwatchtv', label: 'Drink wine and watch TV' },
    { key: 'gotobar', label: 'Go to bar' },
    { key: 'drinkwithmarginals', label: 'Drink with marginals' },
    { key: 'singinsubway', label: 'Sing in subway' },
    { key: 'sleep', label: 'Sleep' },
  ];

  const buttonStyle = {
    padding: '10px',
    borderRadius: '12px',
    fontWeight: '500',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s'
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      color: 'white'
    }}>
      <button
        onClick={() => navigate('/valera')}
        style={{ marginBottom: '20px', background: 'transparent', border: 'none', color: '#2196F3', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}
      >
        ← Back to list
      </button>

      <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>{valera.name}</h2>

      <ProgressBar label="Health" value={valera.health} color="#4CAF50" />
      <ProgressBar label="Mana (Alcohol)" value={valera.mana} color="#9C27B0" />
      <ProgressBar label="Happiness" value={valera.happiness} min={-10} max={10} color="#4CAF50" isCentered />
      <ProgressBar label="Tiredness" value={valera.tiredness} color="#F44336" />

      <div style={{ fontSize: '18px', marginTop: '16px', fontWeight: '500' }}>Money: 💲 {valera.money}</div>

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Actions:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {actions.map(a => (
            <button
              key={a.key}
              onClick={() => doAction(a.key)}
              disabled={a.disabled}
              style={{
                ...buttonStyle,
                backgroundColor: a.disabled ? 'rgba(255,255,255,0.2)' : '#3F51B5',
                cursor: a.disabled ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={e => !a.disabled && (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
