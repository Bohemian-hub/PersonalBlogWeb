<template>
    <div class="record-container">
        <div class="record-header">
            <h1>创建新文章</h1>
            <div class="record-actions">
                <el-button type="info" @click="saveAsDraft">保存草稿</el-button>
                <el-button type="primary" @click="publishArticle">发布文章</el-button>
            </div>
        </div>

        <el-form :model="articleForm" label-position="top" class="article-form">
            <!-- 标题 -->
            <el-form-item label="文章标题" required>
                <el-input v-model="articleForm.title" placeholder="请输入文章标题" maxlength="100" show-word-limit />
            </el-form-item>

            <!-- 两列布局：左侧分类和标签，右侧封面图片 -->
            <div class="two-column-layout">
                <div class="left-column">
                    <!-- 分类 -->
                    <el-form-item label="分类" required>
                        <el-select v-model="articleForm.category" placeholder="选择分类" class="full-width">
                            <el-option v-for="item in categories" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <!-- 标签（带自定义添加功能） -->
                    <el-form-item label="标签">
                        <el-select v-model="articleForm.tags" multiple filterable allow-create default-first-option
                            :reserve-keyword="false" placeholder="选择或添加标签" class="full-width">
                            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <!-- 摘要 -->
                    <el-form-item label="文章摘要">
                        <el-input v-model="articleForm.summary" type="textarea" :rows="4" placeholder="请输入文章摘要"
                            maxlength="200" show-word-limit />
                    </el-form-item>
                </div>

                <div class="right-column">
                    <!-- 封面图片 -->
                    <el-form-item label="封面图片">
                        <div class="cover-container">
                            <!-- 切换封面图片获取方式 -->
                            <div class="cover-method-switch">
                                <el-radio-group v-model="coverMethod" size="small">
                                    <el-radio-button label="upload">上传图片</el-radio-button>
                                    <el-radio-button label="link">图片链接</el-radio-button>
                                </el-radio-group>
                            </div>

                            <!-- 上传图片 -->
                            <div v-if="coverMethod === 'upload'" class="cover-upload-container">
                                <el-upload class="cover-uploader" :show-file-list="false"
                                    :before-upload="beforeCoverUpload" :http-request="customUploadCover">
                                    <img v-if="articleForm.coverUrl" :src="base_url + articleForm.coverUrl"
                                        class="cover-image" />
                                    <div v-else class="upload-placeholder">
                                        <el-icon class="cover-uploader-icon">
                                            <Plus />
                                        </el-icon>
                                        <div class="upload-text">点击上传封面图片</div>
                                    </div>
                                </el-upload>
                            </div>

                            <div v-else class="cover-link-container">
                                <el-input v-model="coverLink" placeholder="请输入图片链接URL" @blur="handleCoverLinkInput"
                                    class="cover-link-input" clearable>
                                    <template #append>
                                        <el-button @click="handleCoverLinkInput">确认</el-button>
                                    </template>
                                </el-input>
                                <div class="cover-preview">
                                    <img v-if="articleForm.coverUrl" :src="articleForm.coverUrl" class="cover-image" />
                                    <div v-else class="preview-placeholder">
                                        <el-icon>
                                            <Picture />
                                        </el-icon>
                                        <div class="preview-text">图片预览区域</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </div>
            </div>


            <!-- mavonEditor 编辑器 -->
            <el-form-item label="文章内容" required>
                <mavon-editor v-model="articleForm.content" :toolbars="markdownToolbars" :box-shadow="false"
                    :code-style="'github'" @imgAdd="handleImgAdd" placeholder="开始创作你的文章..." class="md-editor"
                    ref="mdEditor" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';
import { Plus, Picture } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { uploadImage, uploadMarkdown, saveAsDraftApi, publishArticleApi } from '@/api/article';

import { baseUrl } from '@/common/config'


const base_url = ref(baseUrl);
const router = useRouter();
const mdEditor = ref(null); // 引用Markdown编辑器实例
const coverMethod = ref('upload'); // 封面图片的获取方式：'upload' 或 'link'
const coverLink = ref(''); // 存储用户输入的封面图片链接

// 分类和标签数据
const categories = [
    { value: 'research', label: '学术札记' },
    { value: 'studio', label: '实践工坊' },
    { value: 'play', label: '游民时代' },
    { value: 'feel', label: '认知轨迹' },
    { value: 'say', label: '互动集市' },
];

const tags = [
    { value: 'AI', label: 'AI' },
    { value: '编程', label: '编程' },
    { value: '前端', label: '前端' },
    { value: '后端', label: '后端' },
    { value: '思考', label: '思考' },
    { value: '旅行', label: '旅行' },
    { value: '生活', label: '生活' },
    { value: '阅读', label: '阅读' },
    { value: '学习', label: '学习' },
    { value: '设计', label: '设计' },
];

// 文章表单数据
const articleForm = reactive({
    title: '',
    category: '',
    tags: [],
    coverUrl: '',
    summary: '',
    content: '',
    status: 'draft' // draft 或 published
});

// 处理图片链接输入
const handleCoverLinkInput = () => {
    if (coverLink.value) {
        // 验证链接是否为有效的图片URL (简单验证)
        if (!isValidImageUrl(coverLink.value)) {
            ElMessage.warning('请输入有效的图片链接');
            return;
        }

        articleForm.coverUrl = coverLink.value;
        ElMessage.success('封面图片链接已设置');
    }
};

// 简单验证图片URL (实际应用中可能需要更复杂的验证)
const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null ||
        url.startsWith('http') || url.startsWith('https');
};

// Markdown 编辑器工具栏配置
const markdownToolbars = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // 代码
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示HTML源码
    help: true, // 帮助
    /* 1.3.5 新增 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: true, // 保存（触发events中的save事件）
    /* 1.4.2 新增 */
    navigation: true, // 导航目录
    /* 2.1.8 新增 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 新增 */
    subfield: true, // 单双栏模式
    preview: true, // 预览
};

// Markdown文件上传相关
const mdFileId = ref('');
const mdFileName = ref('');

// 检查文章内容是否准备好上传
const isContentReady = () => {
    if (!articleForm.content && !mdFileId.value) {
        ElMessage.warning('请填写文章内容或上传Markdown文件');
        return false;
    }
    return true;
};
// 添加新函数：将编辑器内容上传为Markdown文件
const uploadEditorContent = async () => {
    // 创建文件对象
    const fileName = `${articleForm.title || 'Untitled'}-${new Date().getTime()}.md`;
    const file = new File([articleForm.content], fileName, { type: 'text/markdown' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', articleForm.title || 'Untitled');
    formData.append('description', articleForm.summary || '');
    //等待提示
    const loading = ElLoading.service({
        lock: true,
        text: '内容上传中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    // 调用上传接口
    const result = await uploadMarkdown(formData);
    // 关闭提示
    loading.close();
    return result;
};
// 准备上传的文章数据
// 修改为异步函数
const prepareArticleData = async () => {
    const data = {
        title: articleForm.title,
        summary: articleForm.summary,
        cover_image_url: articleForm.coverUrl,
        category: articleForm.category,
        tags: articleForm.tags,
        status: articleForm.status
    };


    // 否则将编辑器内容转为md文件并上传
    try {
        const result = await uploadEditorContent();
        data.content_url = `/media/markdown/${result.id}`;
        // 保存ID以便后续操作
        mdFileId.value = result.id;
        mdFileName.value = `${articleForm.title || 'Untitled'}-${new Date().getTime()}.md`;
    } catch (error) {
        ElMessage.error('内容上传失败，请重试');
        throw error;
    }


    return data;
};

// 自定义封面图片上传方法
const customUploadCover = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
        const loading = ElLoading.service({
            lock: true,
            text: '封面图片上传中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        const formData = new FormData();
        formData.append('file', file);

        // 调用上传接口，拦截器已处理响应
        const result = await uploadImage(formData);
        loading.close();

        // result已经是response.data.body
        articleForm.coverUrl = result.url;
        onSuccess(result);
        ElMessage.success('封面图片上传成功');
    } catch (error) {
        // 错误已被拦截器处理并显示
        onError(error);
    }
};



// Markdown编辑器的图片上传
const handleImgAdd = async (pos, file) => {
    try {
        const loading = ElLoading.service({
            lock: true,
            text: '图片上传中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        const formData = new FormData();
        formData.append('file', file);

        // 调用上传接口，拦截器已处理响应
        const result = await uploadImage(formData);
        loading.close();

        mdEditor.value.$img2Url(pos, baseUrl + result.url);
        ElMessage.success('图片上传成功');
    } catch (error) {
        // 错误已被拦截器处理并显示
    }
};



const beforeCoverUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        ElMessage.error('只能上传图片文件!');
        return false;
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB!');
        return false;
    }
    return true;
};

// 保存文章为草稿
const saveAsDraft = async () => {
    if (!articleForm.title) {
        ElMessage.warning('请填写文章标题');
        return;
    }

    if (!isContentReady()) return;

    try {
        const loading = ElLoading.service({
            lock: true,
            text: '保存草稿中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        articleForm.status = 'draft';
        const articleData = await prepareArticleData(); // 使用await等待上传完成

        // 调用保存接口，拦截器已处理响应
        const result = await saveAsDraftApi(articleData);
        loading.close();

        ElMessage.success('草稿保存成功');
    } catch (error) {
        // 错误已被拦截器处理并显示
    }
};

// 发布文章
const publishArticle = async () => {
    if (!articleForm.title || !articleForm.category) {
        ElMessage.warning('请填写完整的文章信息(标题和分类)');
        return;
    }

    if (!isContentReady()) return;


    const loading = ElLoading.service({
        lock: true,
        text: '发布文章中...',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    articleForm.status = 'published';
    const articleData = await prepareArticleData(); // 使用await等待上传完成

    // 调用发布接口，拦截器已处理响应
    await publishArticleApi(articleData);
    loading.close();

    ElMessage.success('文章发布成功');
    // router.push('/' + articleForm.category);

};

// 验证用户权限
onMounted(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (!storedUser || storedUser.auth !== '1') {
        ElMessage.error('您没有权限访问此页面');
        router.push('/');
        return;
    }


});

</script>

<style scoped>
.record-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    color: #333;
    position: relative;
    z-index: 1;
}

.record-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
}

.record-header h1 {
    font-size: 24px;
    color: #333;
    margin: 0;
    background: linear-gradient(45deg, #333333, #666666);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.record-actions {
    display: flex;
    gap: 10px;
}

.article-form {
    margin-top: 20px;
    width: 100%;
}

/* 两列布局 */
.two-column-layout {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.left-column {
    flex: 11;
    width: 100%;
}

.right-column {
    flex: 4;
    min-width: 300px;
    display: flex;
    flex-direction: column;
}

.full-width {
    width: 100%;
}

/* 标签提示 */
.tag-tip {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}

/* 封面图片上传区域样式 */
.cover-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    /* 居中容器内元素 */
}

.cover-method-switch {
    margin-bottom: 15px;
    text-align: center;
    /* 居中单选按钮组 */
    width: 100%;
}

.cover-upload-container,
.cover-link-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    /* 居中子元素 */
}

.cover-link-input {
    margin-bottom: 15px;
    width: 100%;
    /* 确保输入框占满宽度 */
}

.cover-uploader,
.cover-preview {
    width: 100%;
    max-width: 280px;
    /* 限制最大宽度，使其在右侧列中居中 */
    height: 157.5px;
    /* 保持16:9比例 */
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    /* 水平居中 */
}


.cover-preview {
    cursor: default;
}

.cover-uploader:hover {
    border-color: #409eff;
    background-color: #f0f7ff;
}

.upload-placeholder,
.preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 20px;
    text-align: center;
    /* 确保文字居中 */
}

.cover-uploader-icon,
.preview-placeholder .el-icon {
    font-size: 32px;
    color: #8c939d;
    margin-bottom: 10px;
}

.upload-text,
.preview-text {
    color: #8c939d;
    font-size: 14px;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}


/* Markdown编辑器样式 */
.md-editor {
    width: 100%;
    min-height: 500px;
    margin-bottom: 20px;
    z-index: 1;
}

:deep(.v-note-wrapper) {
    width: 100% !important;
    min-height: 500px;
    z-index: 1;
}

:deep(.v-note-panel) {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 100%;
}

:deep(.v-note-edit) {
    font-size: 15px !important;
}

:deep(.v-note-show) {
    background-color: #fafafa;
    padding: 10px 15px;
}

:deep(.v-note-op) {
    background-color: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
}

/* 响应式调整 */
@media (max-width: 992px) {

    .cover-uploader,
    .cover-preview {
        max-width: 350px;
        height: 197px;
    }

    .record-container {
        margin: 20px 15px;
        padding: 20px;
    }
}

/* 移动端布局适配 */
@media (max-width: 768px) {
    .two-column-layout {
        flex-direction: column;
    }

    .left-column,
    .right-column {
        flex: 1;
        width: 100%;
        min-width: auto;
    }

    .record-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .record-actions {
        width: 100%;
        justify-content: space-between;
    }

    .record-actions .el-button {
        flex: 1;
    }

    .record-container {
        padding: 15px;
        margin: 15px;
    }

    .md-editor {
        min-height: 300px;
    }

    :deep(.v-note-wrapper) {
        min-height: 300px;
    }

    /* 优化移动端工具栏 */
    :deep(.v-note-op) {
        flex-wrap: wrap;
        padding: 5px;
    }

    :deep(.op-icon) {
        margin: 3px !important;
    }
}

/* 小型移动设备调整 */
@media (max-width: 480px) {
    .record-header h1 {
        font-size: 20px;
    }

    .record-container {
        padding: 10px;
        margin: 10px;
    }

    .cover-method-switch .el-radio-button {
        padding: 0 5px;
    }

    .cover-uploader,
    .cover-preview {
        max-width: 100%;
        height: 180px;
    }
}
</style>