const API = 'http://localhost:5121/api/valera';

export const api = {
  getValeras: () =>
    fetch(API).then(r => r.json()),

  createValera: (data) =>
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteValera: (id) =>
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      }),

  getValeraById: (id) =>
    fetch(`${API}/${id}`).then(r => r.json()),

  performAction: (id, action) =>
    fetch(`${API}/${id}/${action}`, { method: 'POST' })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
};
