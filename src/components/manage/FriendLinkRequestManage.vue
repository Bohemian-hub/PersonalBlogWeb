<template>
    <div class="friend-link-request-manage">
        <div class="header-actions">
            <h2>友链申请审核</h2>
            <el-button @click="fetchRequests">刷新</el-button>
        </div>

        <el-table :data="requests" style="width: 100%" v-loading="loading">
            <el-table-column prop="created_at" label="申请时间" width="160" sortable>
                <template #default="scope">
                    {{ new Date(scope.row.created_at).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="150" />
            <el-table-column prop="url" label="链接" min-width="200">
                <template #default="scope">
                    <a :href="scope.row.url.startsWith('http') ? scope.row.url : 'http://' + scope.row.url"
                        target="_blank" class="link-url">{{ scope.row.url }} <el-icon>
                            <TopRight />
                        </el-icon></a>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" min-width="200" />
            <el-table-column prop="email" label="联系邮箱" width="180" />
            <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                    <el-tag :type="getStatusType(scope.row.status)">{{ getStatusText(scope.row.status) }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template #default="scope">
                    <template v-if="scope.row.status === 'pending'">
                        <el-button size="small" type="success" @click="handleApprove(scope.row)">通过</el-button>
                        <el-button size="small" type="danger" @click="handleReject(scope.row)">拒绝</el-button>
                    </template>
                    <span v-else>已处理</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFriendLinkRequests, approveFriendLinkRequest, rejectFriendLinkRequest } from '@/api/friend_link';
import { ElMessage, ElMessageBox } from 'element-plus';
import { TopRight } from '@element-plus/icons-vue';

const requests = ref([]);
const loading = ref(false);

const fetchRequests = async () => {
    loading.value = true;
    try {
        const res = await getFriendLinkRequests();
        if (res) {
            requests.value = res;
        }
    } catch (e) {
        // Interceptor handles error
    } finally {
        loading.value = false;
    }
};

const getStatusType = (status) => {
    const map = {
        'pending': 'warning',
        'approved': 'success',
        'rejected': 'info'
    };
    return map[status] || 'info';
};

const getStatusText = (status) => {
    const map = {
        'pending': '待审核',
        'approved': '已通过',
        'rejected': '已拒绝'
    };
    return map[status] || status;
};

const handleApprove = (row) => {
    ElMessageBox.confirm(`确定通过 "${row.name}" 的申请并添加到友链列表吗？`, '提示', {
        type: 'success'
    }).then(async () => {
        try {
            await approveFriendLinkRequest(row.id);
            ElMessage.success('已通过并添加');
            fetchRequests();
        } catch (e) {
            // Error handled by interceptor
        }
    });
};

const handleReject = (row) => {
    ElMessageBox.confirm(`确定拒绝 "${row.name}" 的申请吗？`, '提示', {
        type: 'warning'
    }).then(async () => {
        try {
            await rejectFriendLinkRequest(row.id);
            ElMessage.success('已拒绝');
            fetchRequests();
        } catch (e) {
            // Error handled by interceptor
        }
    });
};

onMounted(() => {
    fetchRequests();
});
</script>

<style scoped>
.friend-link-request-manage {
    padding: 20px;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.link-url {
    color: #409eff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.link-url:hover {
    text-decoration: underline;
}
</style>