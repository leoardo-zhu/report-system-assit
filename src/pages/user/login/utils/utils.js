import { parse } from 'qs';
import Cookies from 'js-cookie';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return Cookies.set('Authority', JSON.stringify(proAuthority));
}

export function setToken(token) {
  return Cookies.set('Token', token);
}
