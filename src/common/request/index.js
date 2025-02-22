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
        // 设置 Authorization（根据需求自行调整）
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
        if (response.status !== 200) {
            return Promise.reject(new Error(`请求错误，状态码 ${response.status}`));
        }

        const { error, body, msg } = response.data;
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
    },
    error => {
        console.error('响应错误:', error);
        return Promise.reject(error);
    }
);

export default service;