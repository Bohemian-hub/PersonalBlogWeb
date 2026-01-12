<template>
    <div class="friend-link-manage">
        <div class="header-actions">
            <h2>友情链接管理</h2>
            <el-button type="primary" @click="openDialog()">添加友链</el-button>
        </div>

        <el-table :data="links" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="名称" width="180" />
            <el-table-column prop="url" label="链接" min-width="200">
                <template #default="scope">
                    <a :href="scope.row.url.startsWith('http') ? scope.row.url : 'http://' + scope.row.url"
                        target="_blank" class="link-url">{{ scope.row.url }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" min-width="200" />
            <el-table-column prop="logo" label="Logo" width="100">
                <template #default="scope">
                    <img v-if="scope.row.logo" :src="scope.row.logo" alt="logo" class="list-logo" />
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'approved' ? 'success' : 'warning'">{{ scope.row.status
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template #default="scope">
                    <el-button size="small" @click="openDialog(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" :title="form.id ? '编辑友链' : '添加友链'" width="500px">
            <el-form :model="form" label-width="80px">
                <el-form-item label="名称" required>
                    <el-input v-model="form.name" placeholder="请输入网站名称" />
                </el-form-item>
                <el-form-item label="链接" required>
                    <el-input v-model="form.url" placeholder="https://example.com" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description" type="textarea" placeholder="网站描述" />
                </el-form-item>
                <el-form-item label="Logo URL">
                    <el-input v-model="form.logo" placeholder="Logo图片链接" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="startTimeSubmit" :loading="submitting">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFriendLinks, createFriendLink, updateFriendLink, deleteFriendLink } from '@/api/friend_link';
import { ElMessage, ElMessageBox } from 'element-plus';

const links = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const submitting = ref(false);

const form = ref({
    id: null,
    name: '',
    url: '',
    description: '',
    logo: '',
    status: 'approved'
});

const fetchLinks = async () => {
    loading.value = true;
    try {
        const res = await getFriendLinks();
        if (res) {
            links.value = res;
        }
    } catch (e) {
        ElMessage.error('加载失败');
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const openDialog = (row = null) => {
    if (row) {
        form.value = { ...row };
    } else {
        form.value = {
            id: null,
            name: '',
            url: '',
            description: '',
            logo: '',
            status: 'approved'
        };
    }
    dialogVisible.value = true;
};

const startTimeSubmit = async () => { // Rename to handleSubmit to avoid confusion
    if (!form.value.name || !form.value.url) {
        ElMessage.warning('请填写名称和链接');
        return;
    }

    submitting.value = true;
    try {
        if (form.value.id) {
            await updateFriendLink(form.value);
        } else {
            await createFriendLink(form.value);
        }

        ElMessage.success('操作成功');
        dialogVisible.value = false;
        fetchLinks();
    } catch (e) {
        // Error handling is mostly done by interceptor
        console.error(e);
    } finally {
        submitting.value = false;
    }
};

const handleDelete = (row) => {
    ElMessageBox.confirm('确定删除该友链吗？', '提示', {
        type: 'warning'
    }).then(async () => {
        try {
            await deleteFriendLink(row.id);
            ElMessage.success('删除成功');
            fetchLinks();
        } catch (e) {
            ElMessage.error('删除出错');
        }
    });
};

onMounted(() => {
    fetchLinks();
});
</script>

<style scoped>
.friend-link-manage {
    padding: 20px;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.list-logo {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 4px;
}

.link-url {
    color: #409eff;
    text-decoration: none;
}

.link-url:hover {
    text-decoration: underline;
}
</style>
