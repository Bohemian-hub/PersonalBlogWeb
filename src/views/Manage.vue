<template>
  <div class="manage-page">
    <!-- 顶部栏 -->
    <div class="manage-header">
      <div class="header-left">
        <div class="toggle-btn" @click="toggleSidebar">
          <div class="menu-icon" :class="{ 'active': isSidebarVisible }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1>博客管理中心</h1>
      </div>
      <div class="header-actions">
        <el-button type="primary" size="small" round @click="backToSite">
          <el-icon>
            <Back />
          </el-icon>
          返回网站
        </el-button>
      </div>
    </div>

    <!-- 主体内容区 -->
    <div class="manage-content">
      <!-- 侧边导航栏 -->
      <transition name="slide-fade">
        <div class="manage-sidebar" v-show="isSidebarVisible">
          <el-menu :default-active="activeIndex" class="sidebar-menu" @select="handleSelect" background-color="#001529"
            text-color="#ffffff" active-text-color="#1890ff">
            <el-menu-item index="article-manage">
              <el-icon>
                <Collection />
              </el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="comment-manage">
              <el-icon>
                <ChatDotRound />
              </el-icon>
              <span>评论管理</span>
            </el-menu-item>
            <el-menu-item index="category-manage">
              <el-icon>
                <Folder />
              </el-icon>
              <span>分类管理</span>
            </el-menu-item>
            <el-menu-item index="settings">
              <el-icon>
                <Setting />
              </el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </transition>

      <!-- 内容显示区域 -->
      <div class="manage-main" :class="{ 'main-expanded': !isSidebarVisible }">
        <div class="panel-container">
          <div class="panel-header">
            <div class="panel-title">
              <el-icon :size="20" class="panel-icon">
                <component :is="getPanelIcon(activeIndex)" />
              </el-icon>
              <h2>{{ getPanelTitle(activeIndex) }}</h2>
            </div>
            <div class="panel-actions">
              <!-- 根据面板类型显示不同操作按钮 -->
              <template v-if="activeIndex === 'article-manage'">
                <el-button type="primary" @click="navigateToPublish">
                  <el-icon>
                    <Plus />
                  </el-icon>写文章
                </el-button>
              </template>
            </div>
          </div>

          <div class="panel-content">
            <!-- 处理Record组件的事件 -->
            <component :is="currentComponent" :key="componentKey" :article-id="editingArticleId"
              @editArticle="handleEditArticle" @cancelEdit="handleCancelEdit" @publishSuccess="handlePublishSuccess"
              @saveSuccess="handleSaveSuccess" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted, onBeforeMount, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
  Document, Collection, ChatDotRound, Folder, Setting,
  Menu, ArrowRight, Back, Plus, Delete
} from '@element-plus/icons-vue';

// 组件动态引入
const ArticlePublish = defineAsyncComponent(() => import('../components/manage/Record.vue'));
const ArticleManage = defineAsyncComponent(() => import('../components/manage/ArticleManage.vue'));
const CommentManage = defineAsyncComponent(() => import('../components/manage/CommentManage.vue'));
const CategoryManage = defineAsyncComponent(() => import('../components/manage/CategoryManage.vue'));
const SystemSettings = defineAsyncComponent(() => import('../components/manage/SystemSettings.vue'));

const router = useRouter();
const activeIndex = ref('article-manage'); // 默认激活的菜单项
const isSidebarVisible = ref(true); // 控制侧边栏显示状态
const componentKey = ref(0); // 用于强制重新渲染组件
const editingArticleId = ref(null); // 编辑文章ID状态

// 使用shallowRef优化性能，因为组件引用不需要深度响应式
const currentComponent = shallowRef(null);

// 根据activeIndex计算当前应显示的组件
const updateCurrentComponent = () => {
  switch (activeIndex.value) {
    case 'article-publish':
      currentComponent.value = ArticlePublish;
      break;
    case 'article-manage':
      currentComponent.value = ArticleManage;
      break;
    case 'comment-manage':
      currentComponent.value = CommentManage;
      break;
    case 'category-manage':
      currentComponent.value = CategoryManage;
      break;
    case 'settings':
      currentComponent.value = SystemSettings;
      break;
    default:
      currentComponent.value = ArticleManage;
  }
};

// 获取面板标题
const getPanelTitle = (index) => {
  const titles = {
    'article-publish': '发布文章',
    'article-manage': '文章管理',
    'comment-manage': '评论管理',
    'category-manage': '分类管理',
    'settings': '系统设置'
  };
  return titles[index] || '管理面板';
};

// 获取面板图标
const getPanelIcon = (index) => {
  const icons = {
    'article-publish': Document,
    'article-manage': Collection,
    'comment-manage': ChatDotRound,
    'category-manage': Folder,
    'settings': Setting
  };
  return icons[index] || Document;
};

// 处理编辑文章事件
const handleEditArticle = (articleId) => {
  console.log('处理编辑文章事件:', articleId);

  // 设置编辑状态
  editingArticleId.value = articleId;
  activeIndex.value = 'article-publish';
  updateCurrentComponent();

  // 强制重新渲染组件以确保props更新
  componentKey.value++;
};

// 导航到发布页面
const navigateToPublish = () => {
  console.log('导航到发布页面');

  editingArticleId.value = null; // 清除编辑ID
  activeIndex.value = 'article-publish';
  updateCurrentComponent();
  componentKey.value++;
};

// 处理菜单选择事件
const handleSelect = (index) => {
  console.log('菜单选择:', index);

  // 切换菜单时清除编辑状态
  editingArticleId.value = null;
  activeIndex.value = index;
  updateCurrentComponent();
};

// 切换侧边栏显示/隐藏
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

// 返回网站
const backToSite = () => {
  router.push('/');
};

// 初始化时检查屏幕尺寸
const checkScreenSize = () => {
  if (window.innerWidth < 768) {
    isSidebarVisible.value = false;
  }
};

onBeforeMount(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onMounted(() => {
  // 初始化组件
  updateCurrentComponent();
});

// 处理Record组件的事件
const handleCancelEdit = () => {
  editingArticleId.value = null;
  activeIndex.value = 'article-manage';
  updateCurrentComponent();
};

const handlePublishSuccess = () => {
  editingArticleId.value = null;
  activeIndex.value = 'article-manage';
  updateCurrentComponent();
};

const handleSaveSuccess = () => {
  // 保存成功后可以选择留在编辑页面或回到管理页面
  // 这里选择留在编辑页面，用户可以继续编辑
  ElMessage.success('操作完成');
};
</script>

<style scoped>
.manage-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f2f5;
  color: #333;
}

.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 60px;
  background: linear-gradient(135deg, #1a2a6c, #2a4858);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 20;
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-btn {
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.menu-icon {
  position: relative;
  width: 20px;
  height: 20px;
}

.menu-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.menu-icon span:nth-child(1) {
  top: 0px;
}

.menu-icon span:nth-child(2) {
  top: 8px;
}

.menu-icon span:nth-child(3) {
  top: 16px;
}

.menu-icon.active span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
  left: -30px;
}

.menu-icon.active span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}

.manage-header h1 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #e6f7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.header-actions {
  display: flex;
  align-items: center;
}

.manage-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.manage-sidebar {
  width: 240px;
  height: 100%;
  background-color: #001529;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  position: relative;
  transition: all 0.3s ease;
}

.sidebar-menu {
  border-right: none;
  height: calc(100% - 72px);
}

.sidebar-menu :deep(.el-menu-item) {
  height: 56px;
  line-height: 56px;
  margin: 4px 0;
  transition: all 0.3s;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: #1890ff !important;
  color: white !important;
  border-right: 3px solid #1890ff;
}

.sidebar-menu :deep(.el-menu-item):hover {
  background-color: rgba(24, 144, 255, 0.1) !important;
}

.manage-main {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: #f0f2f5;
  transition: all 0.3s ease;
}

.main-expanded {
  margin-left: 0;
}

.panel-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 21, 41, 0.08);
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.panel-icon {
  color: #1890ff;
}

.panel-header h2 {
  font-size: 18px;
  font-weight: 500;
  color: #262626;
  margin: 0;
}

.panel-actions {
  display: flex;
  gap: 12px;
}

.panel-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

/* 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .manage-header h1 {
    font-size: 16px;
  }

  .panel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .panel-actions {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }

  .panel-actions .el-button {
    font-size: 12px;
  }

  .panel-content {
    padding: 16px;
  }

  .manage-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 15;
  }
}
</style>