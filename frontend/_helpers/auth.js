export const authHeader = () => {
  // return authorization header with jwt token
  const token = JSON.parse(localStorage.getItem('jwt'));

  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
};

export const setToken = (token) => {
  if (process.SERVER_BUILD || !window) { return; }
  window.localStorage.setItem('jwt', JSON.stringify(token));
};

export const setUser = (user) => {
  if (process.SERVER_BUILD || !window) { return; }
  window.localStorage.setItem('user', JSON.stringify(user));
};

export const clearStorage = () => {
  if (process.SERVER_BUILD || !window) { return; }
  window.localStorage.removeItem('jwt');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('vuex');
};

export const getUser = () => {
  if (!process.client) { return; }
  const json = window ? window.localStorage.user : undefined;
  return json ? JSON.parse(json) : undefined;
};

export const globalErrorHandler = (error) => {
  const code = parseInt(error?.response && error?.response?.status);
  if (code === 401 || code === 403) {
    clearStorage();
    location.reload();
  } else if (code === 404) {
    throw new Error('404');
  } else {
    throw new Error('500');
  }
};
