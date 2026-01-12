import http from '@/common/request';

export const getActivities = (params) => {
    return http.get('/activity/list', { params });
};

export const saveActivity = (data) => {
    return http.post('/activity/upload', data);
};
