<template>
    <el-dialog v-model="dialogVisible" width="85%" class="gallery-dialog" :append-to-body="true">
      <div class="gallery-container" v-if="photos.length > 0">
        <div class="gallery-slider">
          <div class="current-photo">
            <img :src="currentPhotoUrl" :alt="currentPhoto.title" />
          </div>
          <div class="photo-controls">
            <el-button circle @click="prevPhoto" :disabled="currentImageIndex === 0">
              <el-icon>
                <ArrowLeft />
              </el-icon>
            </el-button>
            <span class="photo-counter">
              {{ currentImageIndex + 1 }} / {{ currentPhoto.images.length }}
              <span class="group-indicator">(组 {{ currentPhotoIndex + 1 }}/{{ photos.length }})</span>
            </span>
            <el-button circle @click="nextPhoto" :disabled="currentImageIndex === currentPhoto.images.length - 1">
              <el-icon>
                <ArrowRight />
              </el-icon>
            </el-button>
          </div>
          <div class="photo-thumbnails">
            <div v-for="(image, idx) in currentPhoto.images" :key="idx" class="thumbnail"
              :class="{ active: idx === currentImageIndex }" @click="currentImageIndex = idx">
              <img :src="image.url" :alt="image.caption || currentPhoto.title" />
            </div>
          </div>
        </div>
        <div class="gallery-info">
          <h3>{{ currentPhoto.title }}</h3>
          <div class="info-meta">
            <p class="location">
              <el-icon>
                <Location />
              </el-icon>
              {{ currentPhoto.location }}
            </p>
            <p class="date">
              <el-icon>
                <Calendar />
              </el-icon>
              {{ currentPhoto.date }}
            </p>
          </div>
          <div class="photo-description" v-html="currentPhoto.description"></div>
  
          <div class="photo-interaction">
            <div class="like-button" @click="toggleLike" :class="{ 'liked': isLiked }">
              <img :src="isLiked ? heartFilledIcon : heartOutlineIcon" alt="like" class="like-icon" />
              <span>{{ currentPhoto.likes }}</span>
            </div>
            <div class="photo-tags">
              <el-tag size="small" v-for="tag in currentPhoto.tags" :key="tag">
                {{ tag }}
              </el-tag>
            </div>
          </div>
  
          <div class="comments-section">
            <h4 class="comments-title">
              <img :src="commentIcon" alt="comments" class="comment-title-icon" />
              评论 ({{ currentPhoto.comments.length }})
            </h4>
            <div class="add-comment">
              <el-input v-model="newComment" placeholder="添加你的评论..." type="textarea" :rows="2" />
              <el-button type="primary" @click="addComment" :disabled="!newComment.trim()">
                发表评论
              </el-button>
              <div style="clear: both;"></div>
            </div>
  
            <div class="comment-list" v-if="currentPhoto.comments.length > 0">
              <div v-for="(comment, idx) in currentPhoto.comments" :key="idx" class="comment-item">
                <div class="comment-avatar">
                  <img :src="comment.avatar" alt="avatar" />
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.author }}</span>
                    <span class="comment-time">{{ comment.time }}</span>
                  </div>
                  <p class="comment-text">{{ comment.text }}</p>
                </div>
              </div>
            </div>
  
            <div class="no-comments" v-else>
              暂无评论，来添加第一条评论吧！
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { Location, Calendar, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  
  // 定义组件接收的props
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    photos: {
      type: Array,
      required: true
    },
    initialPhotoIndex: {
      type: Number,
      default: 0
    },
    heartFilledIcon: {
      type: String,
      required: true
    },
    heartOutlineIcon: {
      type: String,
      required: true
    },
    commentIcon: {
      type: String,
      required: true
    },
    likedPhotoIds: {
      type: Array,
      default: () => []
    }
  });
  
  // 定义组件向外发出的事件
  const emit = defineEmits(['update:visible', 'like', 'comment']);
  
  // 本地状态
  const dialogVisible = ref(props.visible);
  const currentPhotoIndex = ref(props.initialPhotoIndex);
  const currentImageIndex = ref(0);
  const newComment = ref('');
  
  // 同步对话框显示状态
  watch(() => props.visible, (newValue) => {
    dialogVisible.value = newValue;
  });
  
  watch(() => dialogVisible.value, (newValue) => {
    emit('update:visible', newValue);
  });
  
  // 当initialPhotoIndex变化时更新当前展示的照片
  watch(() => props.initialPhotoIndex, (newValue) => {
    currentPhotoIndex.value = newValue;
    currentImageIndex.value = 0; // 重置图片索引
  });
  
  // 计算当前照片组
  const currentPhoto = computed(() => props.photos[currentPhotoIndex.value] || { images: [] });
  
  // 当前显示的照片URL
  const currentPhotoUrl = computed(() => {
    const photo = currentPhoto.value;
    if (photo && photo.images && photo.images.length > currentImageIndex.value) {
      return photo.images[currentImageIndex.value].url;
    }
    return '';
  });
  
  // 检查当前照片是否已点赞
  const isLiked = computed(() => {
    return props.likedPhotoIds.includes(currentPhoto.value.id);
  });
  
  // 上下张切换
  const nextPhoto = () => {
    if (currentImageIndex.value < currentPhoto.value.images.length - 1) {
      currentImageIndex.value++;
    }
  };
  
  const prevPhoto = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--;
    }
  };
  
  // 点赞功能
  const toggleLike = () => {
    emit('like', currentPhoto.value.id);
  };
  
  // 添加评论
  const addComment = () => {
    if (!newComment.value.trim()) return;
  
    const comment = {
      author: '我',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // 默认头像
      text: newComment.value,
      time: '刚刚'
    };
  
    emit('comment', { photoId: currentPhoto.value.id, comment });
    newComment.value = '';
    ElMessage.success('评论发表成功！');
  };
  </script>
  
  <style scoped>
  /* 照片画廊弹窗样式 */
  .gallery-dialog :deep(.el-dialog__header) {
    display: none;
  }
  
  .gallery-dialog :deep(.el-dialog__body) {
    padding: 20px;
  }
  
  .gallery-container {
    display: flex;
    height: 70vh;
    color: var(--text-color);
  }
  
  .gallery-slider {
    flex: 3;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
  }
  
  .current-photo {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .current-photo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .photo-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .photo-counter {
    font-size: 16px;
    font-weight: 500;
  }
  
  .photo-thumbnails {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .thumbnail {
    width: 80px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }
  
  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .thumbnail.active {
    opacity: 1;
    box-shadow: 0 0 0 3px var(--accent-color);
  }
  
  .thumbnail:hover {
    opacity: 0.9;
  }
  
  .gallery-info {
    flex: 1;
    padding: 20px;
    background-color: var(--bg-tertiary);
    border-radius: 10px;
    overflow-y: auto;
  }
  
  .gallery-info h3 {
    margin: 0 0 15px;
    font-size: 24px;
    font-weight: 600;
  }
  
  .info-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .location,
  .date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 15px;
  }
  
  .photo-description {
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .photo-description h1 {
    font-size: 1.5em;
    margin: 0.5em 0;
  }
  
  .photo-description h2 {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
  
  .photo-description p {
    margin: 0.75em 0;
  }
  
  /* 照片画廊弹窗样式增强 */
  .group-indicator {
    font-size: 12px;
    opacity: 0.7;
    margin-left: 5px;
  }
  
  /* 照片画廊弹窗新增样式 */
  .photo-interaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding-top: 15px;
    border-top: 1px solid var(--divider-color);
  }
  
  .like-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .like-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .like-button.liked {
    background: rgba(255, 99, 97, 0.2);
    color: #ff6361;
  }
  
  .like-icon {
    width: 20px;
    height: 20px;
  }
  
  .photo-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  /* 评论区样式 */
  .comments-section {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid var(--divider-color);
  }
  
  .comments-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  .comment-title-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  .comment-list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
  }
  
  .comment-item {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .comment-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .comment-content {
    flex: 1;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .comment-author {
    font-weight: 600;
  }
  
  .comment-time {
    font-size: 12px;
    color: var(--text-muted);
  }
  
  .comment-text {
    margin: 0;
    line-height: 1.5;
  }
  
  .no-comments {
    text-align: center;
    padding: 20px;
    color: var(--text-muted);
    font-style: italic;
  }
  
  .add-comment {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  
  .add-comment :deep(.el-textarea__inner) {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--divider-color);
    color: var(--text-color);
  }
  
  .add-comment .el-button {
    margin-top: 10px;
    float: right;
  }
  
  /* 响应式布局 */
  @media (max-width: 768px) {
    .gallery-container {
      flex-direction: column;
      height: auto;
    }
  
    .gallery-slider {
      padding-right: 0;
      margin-bottom: 20px;
    }
  
    .current-photo {
      height: 300px;
    }
  
    .photo-interaction {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
  
    .comment-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  </style>