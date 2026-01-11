<template>
  <div class="article-manage">
    <!-- 搜索和筛选区域 -->
    <div class="filter-section">
      <el-select v-model="categoryFilter" placeholder="文章分类" clearable @change="handleFilter" style="width: 150px">
        <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="statusFilter" placeholder="发布状态" clearable @change="handleFilter" style="width: 150px">
        <el-option label="已发布" value="published" />
        <el-option label="草稿" value="draft" />
      </el-select>
      <el-input v-model="searchKeyword" placeholder="搜索文章标题" prefix-icon="Search" style="width: 250px" clearable
        @input="handleSearch" /> <!-- 批量操作按钮 -->
      <div class="batch-actions">
        <el-button size="small" type="danger" :disabled="!canBatchDelete" @click="confirmBatchDelete">
          批量删除 ({{ selectedArticles.length }})
        </el-button>
        <el-button size="small" type="primary" :disabled="!canBatchPublish" @click="confirmBatchPublish">
          批量发布 ({{ selectedArticles.length }})
        </el-button>
        <el-button size="small" type="warning" :disabled="!canBatchUnpublish" @click="confirmBatchUnpublish">
          批量撤回 ({{ selectedArticles.length }})
        </el-button>
      </div>
    </div> <!-- 文章列表 -->
    <el-table :data="filteredArticles" stripe style="width: 100%" v-loading="loading"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="文章标题" min-width="200">
        <template #default="scope">
          <div class="article-title-cell">
            <el-image v-if="scope.row.cover_image_url" :src="base_url + scope.row.cover_image_url"
              style="width: 50px; height: 30px; margin-right: 10px" fit="cover" />
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="摘要" width="200" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ scope.row.summary || '暂无摘要' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="120">
        <template #default="scope">
          <el-tag size="small">{{ getCategoryLabel(scope.row.category) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签" width="150" show-overflow-tooltip>
        <template #default="scope">
          <div class="tags-cell">
            <el-tag v-for="tag in scope.row.tags" :key="tag" size="small" type="info"
              style="margin-right: 5px; margin-bottom: 2px">
              {{ tag }}
            </el-tag>
            <span v-if="!scope.row.tags || scope.row.tags.length === 0" class="no-tags">暂无标签</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180" sortable />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'published' ? 'success' : 'info'" size="small">
            {{ scope.row.status === 'published' ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="likes_count" label="点赞" width="80" sortable>
        <template #default="scope">
          <span>{{ scope.row.likes_count || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="comments_count" label="评论" width="80" sortable>
        <template #default="scope">
          <span>{{ scope.row.comments_count || 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="views" label="阅读量" width="100" sortable />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="editArticle(scope.row.id)">编辑</el-button>
          <el-button size="small" type="primary" v-if="scope.row.status === 'draft'"
            @click="publishArticle(scope.row.id)">
            发布
          </el-button>
          <el-button size="small" type="warning" v-if="scope.row.status === 'published'"
            @click="unpublishArticle(scope.row.id)">
            撤回
          </el-button>
          <el-button size="small" type="danger" :disabled="scope.row.status === 'published'"
            @click="confirmDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table> <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper" :total="totalArticles" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  getArticles,
  deleteArticle,
  publishDraftArticle,
  unPublishArticle,
  getImage,
  batchDeleteArticles,
  batchPublishArticles,
  batchUnpublishArticles
} from '@/api/article';
import { baseUrl } from '@/common/config'
const base_url = ref(baseUrl);
// 分类数据
const categories = [
  { value: 'research', label: '我的文章' },
  { value: 'studio', label: '我的项目' },
  { value: 'play', label: '朋友圈' },
];// 文章列表状态
const articles = ref([]);
const loading = ref(false);
const selectedArticles = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const totalArticles = ref(0);// 筛选状态
const searchKeyword = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');// 获取分类标签
const getCategoryLabel = (value) => {
  const category = categories.find(c => c.value === value);
  return category ? category.label : value;
};// 筛选后的文章列表
const filteredArticles = computed(() => {
  // 实际应用中，这里应该调用API进行服务器端筛选
  // 这里只是前端示例
  return articles.value;
});// 获取文章列表
const fetchArticles = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      page_size: pageSize.value,
    };    // 添加筛选条件
    if (searchKeyword.value.trim()) {
      params.keyword = searchKeyword.value.trim();
    }
    if (categoryFilter.value) {
      params.category = categoryFilter.value;
    }
    if (statusFilter.value) {
      params.status = statusFilter.value;
    } const response = await getArticles(params);
    console.log('API响应:', response); // 调试输出    // 直接使用封装后的响应数据
    articles.value = response.items || [];
    totalArticles.value = response.total || 0;
  } catch (error) {
    console.error('请求错误详情:', error);
    ElMessage.error('获取文章列表失败：' + (error.message || '网络错误'));
    // 请求失败时设置空数组
    articles.value = [];
    totalArticles.value = 0;
  } finally {
    loading.value = false;
  }
};// 处理搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchArticles();
};// 处理筛选
const handleFilter = () => {
  currentPage.value = 1;
  fetchArticles();
};// 处理多选
const handleSelectionChange = (selection) => {
  selectedArticles.value = selection;
};// 处理页码变化
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchArticles();
};// 处理每页条数变化
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1;
  fetchArticles();
};// 编辑文章 - 修改为通过事件通信
const editArticle = (id) => {
  // 通过emit通知父组件切换到编辑模式
  emit('editArticle', id);
};// 定义emit
const emit = defineEmits(['editArticle']);// 发布草稿
const publishArticle = async (id) => {
  try {
    await publishDraftArticle(id);
    ElMessage.success('文章发布成功');
    fetchArticles();
  } catch (error) {
    console.error('发布错误:', error);
    ElMessage.error('发布失败：' + (error.message || '网络错误'));
  }
};// 撤回已发布文章
const unpublishArticle = async (id) => {
  try {
    await unPublishArticle(id);
    ElMessage.success('文章撤回成功');
    fetchArticles();
  } catch (error) {
    console.error('撤回错误:', error);
    ElMessage.error('撤回失败：' + (error.message || '网络错误'));
  }
};// 确认删除
const confirmDelete = (id) => {
  ElMessageBox.confirm(
    '确定要删除这篇文章吗？此操作不可逆',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await deleteArticle(id);
      ElMessage.success('删除成功');
      // 如果删除后当前页没有数据且不是第一页，则跳转到上一页
      if (articles.value.length === 1 && currentPage.value > 1) {
        currentPage.value--;
      }
      fetchArticles();
    } catch (error) {
      console.error('删除错误:', error);
      ElMessage.error('删除失败：' + (error.message || '网络错误'));
    }
  }).catch(() => {
    // 用户取消操作
  });
};// 批量操作的计算属性
const canBatchDelete = computed(() => {
  return selectedArticles.value.length > 0 &&
    selectedArticles.value.every(article => article.status === 'draft');
}); const canBatchPublish = computed(() => {
  return selectedArticles.value.length > 0 &&
    selectedArticles.value.every(article => article.status === 'draft');
}); const canBatchUnpublish = computed(() => {
  return selectedArticles.value.length > 0 &&
    selectedArticles.value.every(article => article.status === 'published');
});// 批量删除确认
const confirmBatchDelete = () => {
  if (!canBatchDelete.value) return; ElMessageBox.confirm(
    `确定要删除选中的 ${selectedArticles.value.length} 篇草稿文章吗？此操作不可逆`,
    '批量删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const articleIds = selectedArticles.value.map(article => article.id);
      const response = await batchDeleteArticles(articleIds); if (response.success_count > 0) {
        ElMessage.success(response.msg || `成功删除 ${response.success_count} 篇文章`);
      }
      if (response.error_count > 0) {
        ElMessage.warning(response.msg || `有 ${response.error_count} 篇文章删除失败`);
      } fetchArticles();
    } catch (error) {
      console.error('批量删除错误:', error);
      ElMessage.error('批量删除失败：' + (error.message || '网络错误'));
    }
  }).catch(() => {
    // 用户取消操作
  });
};// 批量发布确认
const confirmBatchPublish = () => {
  if (!canBatchPublish.value) return; ElMessageBox.confirm(
    `确定要发布选中的 ${selectedArticles.value.length} 篇草稿文章吗？`,
    '批量发布确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(async () => {
    try {
      const articleIds = selectedArticles.value.map(article => article.id);
      const response = await batchPublishArticles(articleIds); if (response.success_count > 0) {
        ElMessage.success(response.msg || `成功发布 ${response.success_count} 篇文章`);
      }
      if (response.error_count > 0) {
        ElMessage.warning(response.msg || `有 ${response.error_count} 篇文章发布失败`);
      } fetchArticles();
    } catch (error) {
      console.error('批量发布错误:', error);
      ElMessage.error('批量发布失败：' + (error.message || '网络错误'));
    }
  }).catch(() => {
    // 用户取消操作
  });
};// 批量撤回确认
const confirmBatchUnpublish = () => {
  if (!canBatchUnpublish.value) return; ElMessageBox.confirm(
    `确定要撤回选中的 ${selectedArticles.value.length} 篇已发布文章吗？`,
    '批量撤回确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const articleIds = selectedArticles.value.map(article => article.id);
      const response = await batchUnpublishArticles(articleIds); if (response.success_count > 0) {
        ElMessage.success(response.msg || `成功撤回 ${response.success_count} 篇文章`);
      }
      if (response.error_count > 0) {
        ElMessage.warning(response.msg || `有 ${response.error_count} 篇文章撤回失败`);
      } fetchArticles();
    } catch (error) {
      console.error('批量撤回错误:', error);
      ElMessage.error('批量撤回失败：' + (error.message || '网络错误'));
    }
  }).catch(() => {
    // 用户取消操作
  });
};// 监听搜索关键词变化，实现防抖搜索
let searchTimer = null;
watch(searchKeyword, (newVal) => {
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  searchTimer = setTimeout(() => {
    handleSearch();
  }, 500);
}); onMounted(() => {
  fetchArticles();
});
</script>
<style scoped>
.article-manage {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-end;
}

.batch-actions {
  display: flex;
  gap: 10px;
  margin-left: 15px;
}

.article-title-cell {
  display: flex;
  align-items: center;
}

.tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.no-tags {
  color: #999;
  font-size: 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>