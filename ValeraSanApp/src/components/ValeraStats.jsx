// src/components/ValeraStats.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Отображение параметра как прогресс-бар
function ProgressBar({ label, value, max = 100, color = '#4CAF50' }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={{ height: '12px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  );
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
      loadValera(); // обновить данные
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (!valera) return <div style={{ padding: '20px' }}>Загрузка...</div>;

  // Проверка возможности работать
  const canWork = valera.mana < 50 && valera.tiredness < 10;

  // Маппинг действий: кнопка → маршрут
  const actions = [
    { key: 'gowork', label: 'Пойти на работу', disabled: !canWork },
    { key: 'lookfornature', label: 'Созерцать природу' },
    { key: 'drinkwineandwatchtv', label: 'Пить вино и смотреть сериал' },
    { key: 'gotobar', label: 'Сходить в бар' },
    { key: 'drinkwithmarginals', label: 'Выпить с маргинальными личностями' },
    { key: 'singinsubway', label: 'Петь в метро' },
    { key: 'sleep', label: 'Спать' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={() => navigate('/valera')} style={{ marginBottom: '16px', color: '#2196F3' }}>
        ← Назад к списку
      </button>
      <h2>{valera.name}</h2>

      <ProgressBar label="Здоровье" value={valera.health} max={100} color="#4CAF50" />
      <ProgressBar label="Алкоголь (мана)" value={valera.mana} max={100} color="#9C27B0" />
      <ProgressBar label="Жизнерадостность" value={valera.happiness + 10} max={20} color="#FFC107" />
      <ProgressBar label="Усталость" value={valera.tiredness} max={100} color="#F44336" />
      <div style={{ fontSize: '18px', marginTop: '10px' }}>Деньги: 💰 {valera.money}</div>

      <div style={{ marginTop: '24px' }}>
        <h3>Действия:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
          {actions.map(a => (
            <button
              key={a.key}
              onClick={() => doAction(a.key)}
              disabled={a.disabled}
              style={{
                padding: '10px',
                backgroundColor: a.disabled ? '#ccc' : '#3F51B5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: a.disabled ? 'not-allowed' : 'pointer',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}