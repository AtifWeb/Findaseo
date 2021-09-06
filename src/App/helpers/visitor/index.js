const AUTH_KEY = "PavelifySESSIONKEY";

export const saveVisitor = (auth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  return true;
};

export const isActive = () => {
  let currentAuth = localStorage.getItem(AUTH_KEY);
  if (!currentAuth) return false;
  currentAuth = JSON.parse(currentAuth);
  if (currentAuth?.cID && currentAuth.uuid) return true;
  return false;
};
export const getVisitor = () => {
  let currentAuth = localStorage.getItem(AUTH_KEY);
  if (!currentAuth) return false;
  return JSON.parse(currentAuth);
};
