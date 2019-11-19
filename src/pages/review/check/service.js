import request from '@/utils/request';

export async function getCheckReports() {
  return request('/api/daily/check', {
    method: 'POST',
  });
}

export async function changeStatus(params) {
  return request('/api/daily/upStatus', {
    method: 'POST',
    params,
  });
}
