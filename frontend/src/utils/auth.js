export const register = (email, password) => fetch('https://backend15.nomoredomains.xyz/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then((response) => response);

export const authorize = (email, password) => fetch('https://backend15.nomoredomains.xyz/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then((response) => response.json());

export const checkToken = (token) => fetch('https://backend15.nomoredomains.xyz/users/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then((res) => res.json());
