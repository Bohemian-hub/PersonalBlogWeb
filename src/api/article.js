import http from '@/common/request';

// 文章操作相关接口
export const createArticle = data => http.post('/article/upload', data);
export const saveAsDraftApi = data => http.post('/article/upload', { ...data, status: 'draft' });
export const publishArticleApi = data => http.post('/article/upload', { ...data, status: 'published' });

// 媒体上传相关接口
export const uploadImage = formData => {
  return http.post('/media/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const uploadMarkdown = formData => {
  return http.post('/media/upload/markdown', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 获取媒体接口
export const getImage = imageId => http.get(`/media/image/${imageId}`);
export const getMarkdown = mdId => http.get(`/media/markdown/${mdId}`);

// 添加一个获取图片URL的工具函数
export const getImageUrl = imageId => {
  const baseURL = http.defaults.baseURL || '';
  return `${baseURL}/media/image/${imageId}`;
};

// 文章管理相关接口
export const getArticles = params => {
  return http.get('/article/list', { params });
};

export const getArticleById = id => {
  return http.get(`/article/${id}`);
};

export const deleteArticle = id => {
  return http.delete(`/article/${id}`);
};

export const publishDraftArticle = id => {
  return http.patch(`/article/${id}/publish`);
};
