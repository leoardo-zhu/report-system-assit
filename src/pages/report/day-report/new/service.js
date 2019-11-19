import request from '@/utils/request';

export async function submitReport(data) {
  return request('/api/daily/save', {
    method: 'POST',
    data,
  });
}
