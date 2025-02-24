import http from '@/common/request';

// 发送验证码
export const sendCode = data => http.post('/auth/send-code', data)

// 注册
export const register = data => http.post('/auth/register', data)

// 登录 
export const login = data => http.post('/auth/login', data)