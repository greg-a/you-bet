export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const handleRedirect = (path) => {
  if (window.location.pathname === '/signup') return null;
  if (window.location.pathname !== path) return window.location.href = path;
};

export const diceRoller = () => {
  return 0;
};
