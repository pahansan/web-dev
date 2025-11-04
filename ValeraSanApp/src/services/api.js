// src/services/api.js
const API = 'http://localhost:5121/api';

export const api = {
  // Получить всех Валер — ответ: [{ id, name, health, mana, happiness, tiredness, money }]
  getValeras: () => fetch(`${API}/valera`).then(r => r.json()),

  // Создать Валеру — отправляем { name, state: { ... } }
  createValera: (data) =>
    fetch(`${API}/valera`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Получить одного Валеру — ответ: { id, name, ... }
  getValeraById: (id) => fetch(`${API}/valera/${id}`).then(r => r.json()),

  // Выполнить действие — POST на /{id}/action
  performAction: (id, action) =>
    fetch(`${API}/valera/${id}/${action}`, {
      method: 'POST',
    }).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
};