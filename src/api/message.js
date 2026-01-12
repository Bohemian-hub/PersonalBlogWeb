import http from '@/common/request';

// Public endpoints
export const getMessages = (page = 1, limit = 5) => http.get('/message/list', { params: { page, limit } });
export const addMessage = (data) => http.post('/message/add', data);

// Admin endpoints
export const getAllMessages = (page = 1, limit = 10) => http.get('/message/admin/list', { params: { page, limit } });
export const deleteMessage = (id) => http.post('/message/delete', { id });
