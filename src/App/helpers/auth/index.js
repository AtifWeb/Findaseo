const AUTH_KEY = "PavelifyAUTH";

const ADMIN_KEY = "PavelifyADMIN";

const localStorage = window.localStorage;

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

export const adminLogged = () => {
  let currentAuth = localStorage.getItem(ADMIN_KEY);
  if (!currentAuth) return false;
  currentAuth = JSON.parse(currentAuth);
  if (currentAuth?.logged && currentAuth?._id && currentAuth.token) return true;
  return false;
};

export const saveAdmin = (auth) => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(auth));
  return true;
};

export const clearAdmin = () => localStorage.setItem(ADMIN_KEY, null);

export const getAdmin = () => {
  let currentAuth = localStorage.getItem(ADMIN_KEY);
  if (!currentAuth) return false;
  return JSON.parse(currentAuth);
};
