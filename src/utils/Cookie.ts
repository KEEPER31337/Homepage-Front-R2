import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, { maxAge: 60 * 60 * 3, path: '/' });
};

const getCookie = (name: string) => {
  return cookies.get(name);
};

const removeCookie = (name: string) => {
  return cookies.remove(name);
};

export { setCookie, getCookie, removeCookie };
