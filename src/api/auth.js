import http from '@/common/request';


//GET请求/hello 测试
export const hello = () => http.get('/auth/hello')	// 测试

// 登录
export const login = data => http.post('/auth/login', data)	// 登录