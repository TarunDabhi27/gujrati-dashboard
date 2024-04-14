import Cookies from 'js-cookie';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export const isAuthenticated = () => !!Cookies.get('token');

export const storeLoginCredentials = (user: User, tokenId: string) => {
  Cookies.set('token', tokenId, { expires: 365 });
  Cookies.set('user', JSON.stringify(user), { expires: 365 });
};

export const getToken = () => (Cookies.get('token') ? Cookies.get('token') : '');
export const getUser = () => (Cookies.get('user') ? JSON.parse(Cookies.get('user')) : '');

export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  refresh();
};

const refresh = () => window.location.reload();
