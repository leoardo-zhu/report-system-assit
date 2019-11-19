import request from '@/utils/request';
import Cookies from 'js-cookie';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/user/userInfo');
}
export async function queryNotices() {
  return request('/api/notices');
}

export async function bindManager(params) {
  return request('/api/user/bindManager', {
    method: 'POST',
    params,
  });
}
