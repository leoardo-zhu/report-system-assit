import request from '@/utils/request';

export async function getWeekReport(params) {
  return request('/api/week/get', {
    method: 'POST',
    params,
  });
}

export async function editAssess(params) {
  return request('/api/week/update', {
    method: 'POST',
    params,
  });
}
