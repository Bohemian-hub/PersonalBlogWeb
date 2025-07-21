import http from '@/common/request';

// 文章操作相关接口（需要管理员权限）
export const createArticle = data => http.post('/article/upload', data);
export const saveAsDraftApi = data => http.post('/article/upload', { ...data, status: 'draft' });
export const publishArticleApi = data => http.post('/article/upload', { ...data, status: 'published' });

// 媒体上传相关接口（需要管理员权限）
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

// 获取媒体接口（公开接口）
export const getImage = imageId => http.get(`/media/image/${imageId}`);
export const getMarkdown = mdId => http.get(`/media/markdown/${mdId}`);

// 添加一个获取图片URL的工具函数
export const getImageUrl = imageId => {
  const baseURL = http.defaults.baseURL || '';
  return `${baseURL}/media/image/${imageId}`;
};

// 文章管理接口（需要管理员权限）
export const getArticleById = id => {
  return http.get(`/article/${id}`);
};

export const getArticles = params => {
  return http.get('/article/list', { params });
};

export const deleteArticle = id => {
  return http.delete(`/article/${id}`);
};

export const publishDraftArticle = id => {
  return http.patch(`/article/${id}/publish`);
};

// 撤回已发布文章为草稿
export const unPublishArticle = id => {
  return http.patch(`/article/${id}/unpublish`);
};

// 获取文章完整内容（用于编辑）
export const getArticleContent = id => {
  return http.get(`/article/${id}/content`);
};

// 更新文章
export const updateArticle = (id, data) => {
  return http.put(`/article/${id}`, data);
};

// 更新文章为草稿
export const updateAsDraftApi = (id, data) => {
  return http.put(`/article/${id}`, { ...data, status: 'draft' });
};

// 更新并发布文章
export const updateAndPublishApi = (id, data) => {
  return http.put(`/article/${id}`, { ...data, status: 'published' });
};

// 获取Markdown内容
export const getMarkdownContent = mdId => {
  return http.get(`/media/markdown/${mdId}`);
};

// 批量操作接口
export const batchDeleteArticles = articleIds => {
  return http.post('/article/batch/delete', { article_ids: articleIds });
};

export const batchPublishArticles = articleIds => {
  return http.post('/article/batch/publish', { article_ids: articleIds });
};

export const batchUnpublishArticles = articleIds => {
  return http.post('/article/batch/unpublish', { article_ids: articleIds });
};
