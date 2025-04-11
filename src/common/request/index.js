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
        config.headers.Authorization = sessionStorage['token'] || '';
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
            } else if (error === 10010 || error === 10011) {
                ElMessage({
                    message: msg,
                    type: 'error'
                });
                sessionStorage.clear();
                router.push('/login');
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
        ElMessage({
            message: error.message || '网络错误',
            type: 'error'
        });
        return Promise.reject(error);
    }
);

export default service;