const AUTH_KEY = "PavelifyAUTH";

export const saveLogin = (auth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  return true;
};

export const isLogin = () => {
  let currentAuth = localStorage.getItem(AUTH_KEY);
  if (!currentAuth) return false;
  currentAuth = JSON.parse(currentAuth);
  if (currentAuth?.logged && currentAuth?.cID && currentAuth.token) return true;
  return false;
};
export const getUser = () => {
  let currentAuth = localStorage.getItem(AUTH_KEY);
  if (!currentAuth) return false;
  return JSON.parse(currentAuth);
};

export const clearUser = () => localStorage.setItem(AUTH_KEY, null);
