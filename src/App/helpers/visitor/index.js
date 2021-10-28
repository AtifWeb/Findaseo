const AUTH_KEY = "PavelifySESSIONKEY-";

export const saveVisitor = (auth, companyID) => {
  localStorage.setItem(AUTH_KEY + companyID, JSON.stringify(auth));
  return true;
};

export const isActive = () => {
  let currentAuth = localStorage.getItem(AUTH_KEY);
  if (!currentAuth) return false;
  currentAuth = JSON.parse(currentAuth);
  if (currentAuth?.cID && currentAuth.uuid) return true;
  return false;
};
export const getVisitor = (companyID) => {
  let currentAuth = localStorage.getItem(AUTH_KEY + companyID);
  if (!currentAuth) return false;
  return JSON.parse(currentAuth);
};
