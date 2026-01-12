<template>
    <div class="message-manage">
        <div class="header-actions">
            <h2>留言管理</h2>
            <el-button @click="fetchMessages">刷新</el-button>
        </div>

        <el-table :data="messages" style="width: 100%" v-loading="loading">
            <el-table-column prop="created_at" label="时间" width="180">
                <template #default="scope">
                    {{ new Date(scope.row.created_at).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="avatar" label="头像" width="80">
                <template #default="scope">
                    <img :src="scope.row.avatar"
                        style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
                </template>
            </el-table-column>
            <el-table-column prop="author" label="昵称" width="150" />
            <el-table-column prop="content" label="内容" min-width="300" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column prop="is_private" label="状态" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.is_private" type="warning">私密</el-tag>
                    <el-tag v-else type="success">公开</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
                <template #default="scope">
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                layout="total, prev, pager, next" @current-change="handlePageChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllMessages, deleteMessage } from '@/api/message';
import { ElMessage, ElMessageBox } from 'element-plus';

const messages = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const fetchMessages = async () => {
    loading.value = true;
    try {
        const res = await getAllMessages(currentPage.value, pageSize.value);
        if (res && res.list) {
            messages.value = res.list;
            total.value = res.total;
        }
    } catch (e) {
        // Error handled by interceptor
    } finally {
        loading.value = false;
    }
};

const handlePageChange = (page) => {
    currentPage.value = page;
    fetchMessages();
};

const handleDelete = (row) => {
    ElMessageBox.confirm('确定要删除这条留言吗？', '提示', {
        type: 'warning'
    }).then(async () => {
        try {
            await deleteMessage(row.id);
            ElMessage.success('删除成功');
            fetchMessages();
        } catch (e) {
            // Error handled by interceptor
        }
    });
};

onMounted(() => {
    fetchMessages();
});
</script>

<style scoped>
.message-manage {
    padding: 20px;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
