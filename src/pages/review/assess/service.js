import request from '@/utils/request';

export async function getAssesses() {
  return request('/api/week/check', {
    method: 'POST',
  });
}
