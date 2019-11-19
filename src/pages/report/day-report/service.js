import request from '@/utils/request';

export async function getReports() {
  return request('/api/daily/get', {
    method: 'POST',
  });
}

export async function changeStatus({ key, status }) {
  return request('/api/daily/upStatus', {
    method: 'POST',
    params: { id: key, status },
  });
}

export async function urgeManager() {
  return request('/api/daily/hurry', {
    method: 'POST',
  });
}

export async function submitReport(data) {
  return request('/api/daily/save', {
    method: 'POST',
    data,
  });
}

export async function updateReport({ report }) {
  return request('/api/daily/update', {
    method: 'POST',
    data: report,
  });
}
