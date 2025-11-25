const API_URL = 'http://localhost:5121/api';
const AUTH_KEY = 'valera_token';

const getToken = () => localStorage.getItem(AUTH_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_KEY, token);
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
};

const fetchWithAuth = (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
};

export const api = {
  login: (email, password) =>
    fetchWithAuth(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(async r => {
      if (!r.ok) throw new Error('Invalid credentials');
      const data = await r.json();
      return data;
    }),

  register: (username, email, password) =>
    fetchWithAuth(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    }).then(r => {
      if (!r.ok) throw new Error('Registration failed');
      return r.json();
    }),

  getValeras: () =>
    fetchWithAuth(`${API_URL}/valera`).then(r => {
      if (!r.ok) throw new Error('Failed to fetch valeras');
      return r.json();
    }),

  getMyValeras: () =>
    fetchWithAuth(`${API_URL}/valera/my`).then(r => {
      if (!r.ok) throw new Error('Failed to fetch valeras');
      return r.json();
    }),

  createValera: (data) =>
    fetchWithAuth(`${API_URL}/valera`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(r => {
      if (!r.ok) throw new Error('Failed to create');
      return r.json();
    }),

  deleteValera: (id) =>
    fetchWithAuth(`${API_URL}/valera/${id}`, { method: 'DELETE' })
      .then(r => {
        if (r.status === 403) throw new Error('Access denied');
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
      }),

  getValeraById: (id) =>
    fetchWithAuth(`${API_URL}/valera/${id}`).then(r => {
      if (r.status === 403) throw new Error('Access denied');
      if (!r.ok) throw new Error('Valera not found');
      return r.json();
    }),

  performAction: (id, action) =>
    fetchWithAuth(`${API_URL}/valera/${id}/${action}`, { method: 'POST' })
      .then(r => {
        if (r.status === 403) throw new Error('Access denied');
        if (!r.ok) throw new Error('Action failed');
        return r.json();
      }),
};

export const isAuthenticated = () => !!getToken();

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User';
  } catch {
    return null;
  }
};

export const getUserEmail = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  } catch {
    return null;
  }
};


export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  } catch {
    return null;
  }
};

export const logout = () => {
  setToken(null);
  window.location.href = '/login';
};
