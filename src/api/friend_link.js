import http from '@/common/request';

export const getFriendLinks = () => http.get('/friend_link/list');
export const createFriendLink = (data) => http.post('/friend_link/create', data);
export const updateFriendLink = (data) => http.post('/friend_link/update', data);
export const deleteFriendLink = (id) => http.post('/friend_link/delete', { id });

// Friend Link Requests
export const getFriendLinkRequests = () => http.get('/friend_link/request/list');
export const createFriendLinkRequest = (data) => http.post('/friend_link/request/create', data);
export const approveFriendLinkRequest = (id) => http.post('/friend_link/request/approve', { id });
export const rejectFriendLinkRequest = (id) => http.post('/friend_link/request/reject', { id });
