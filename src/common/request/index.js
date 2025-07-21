import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { baseUrl } from '@/common/config'

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.baseURL = baseUrl;
        // 优先使用用户token，否则使用默认token
        const userToken = sessionStorage.getItem('token');
        config.headers.Authorization = userToken || 'default_token';
        return config;
    },
    error => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const { error, body, msg } = response.data;
        if (response.status === 200) {
            if (error === 0) {
                return body;
            } else if (error === 401) {
                ElMessage({
                    message: msg || '请先登录',
                    type: 'error'
                });
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                router.push('/');
                return Promise.reject(new Error(msg));
            } else if (error === 403) {
                ElMessage({
                    message: msg || '无权限访问',
                    type: 'error'
                });
                return Promise.reject(new Error(msg));
            } else {
                ElMessage({
                    message: msg,
                    type: 'error'
                });
                return Promise.reject(new Error(msg));
            }
        } else {
            ElMessage({
                message: msg || `请求错误，状态码 ${response.status}`,
                type: 'error'
            });
            return Promise.reject(new Error(`请求错误，状态码 ${response.status}`));
        }
    },
    error => {
        console.error('响应错误:', error);
        if (error.response?.status === 401) {
            ElMessage({
                message: '登录已过期，请重新登录',
                type: 'error'
            });
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            router.push('/');
        } else {
            ElMessage({
                message: error.message || '网络错误',
                type: 'error'
            });
        }
        return Promise.reject(error);
    }
);

export default service;