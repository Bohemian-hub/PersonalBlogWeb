<template>
  <div class="article-manage">
    <!-- 搜索和筛选区域 -->
    <div class="filter-section">
      <el-input v-model="searchKeyword" placeholder="搜索文章标题" prefix-icon="Search" style="width: 300px" clearable
        @input="handleSearch" />
      <el-select v-model="categoryFilter" placeholder="文章分类" clearable @change="handleFilter">
        <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="statusFilter" placeholder="发布状态" clearable @change="handleFilter">
        <el-option label="已发布" value="published" />
        <el-option label="草稿" value="draft" />
      </el-select>
    </div> <!-- 文章列表 -->
    <el-table :data="filteredArticles" stripe style="width: 100%" v-loading="loading"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="文章标题" min-width="200">
        <template #default="scope">
          <div class="article-title-cell">
            <el-image v-if="scope.row.cover_image_url" :src="scope.row.cover_image_url"
              style="width: 50px; height: 30px; margin-right: 10px" fit="cover" />
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="120">
        <template #default="scope">
          <el-tag size="small">{{ getCategoryLabel(scope.row.category) }}</el-tag>
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
      <el-table-column prop="views" label="阅读量" width="100" sortable />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="editArticle(scope.row.id)">编辑</el-button>
          <el-button size="small" type="primary" v-if="scope.row.status === 'draft'"
            @click="publishArticle(scope.row.id)">
            发布
          </el-button>
          <el-button size="small" type="danger" @click="confirmDelete(scope.row.id)">
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
import { ref, computed, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// 假设你有一个文章API服务
// import { getArticles, deleteArticle, publishDraftArticle } from '@/api/article';// 分类数据
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
    // 实际项目中应该调用API
    // const res = await getArticles({
    //   page: currentPage.value,
    //   pageSize: pageSize.value,
    //   keyword: searchKeyword.value,
    //   category: categoryFilter.value,
    //   status: statusFilter.value
    // });
    // articles.value = res.data.items;
    // totalArticles.value = res.data.total;    // 模拟数据
    articles.value = Array(10).fill().map((_, i) => ({
      id: i + 1,
      title: `文章标题 ${i + 1}`,
      category: ['research', 'studio', 'play'][Math.floor(Math.random() * 5)],
      created_at: new Date().toISOString().split('T')[0],
      status: Math.random() > 0.5 ? 'published' : 'draft',
      views: Math.floor(Math.random() * 1000),
      cover_image_url: `https://picsum.photos/300/200?random=${i}`
    }));
    totalArticles.value = 100;
  } catch (error) {
    ElMessage.error('获取文章列表失败');
    console.error(error);
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
};// 编辑文章
const editArticle = (id) => {
  // 实际项目中应该跳转到编辑页面
  console.log('编辑文章', id);
};// 发布草稿
const publishArticle = async (id) => {
  try {
    // await publishDraftArticle(id);
    ElMessage.success('文章发布成功');
    fetchArticles();
  } catch (error) {
    ElMessage.error('发布失败');
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
      // await deleteArticle(id);
      ElMessage.success('删除成功');
      fetchArticles();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  }).catch(() => {
    // 用户取消操作
  });
}; onMounted(() => {
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
  flex-wrap: wrap;
}

.article-title-cell {
  display: flex;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>