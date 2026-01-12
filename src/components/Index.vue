<template>
    <div class="main" :class="currentTheme">
        <!-- 个人介绍板块 -->
        <section class="section personal-intro">
            <div class="section-header">
                <h2>{{ personalInfo.sectionTitle }}</h2>
            </div>
            <div class="section-content">
                <!-- 左侧头像与数据区域 -->
                <div class="profile-left">
                    <div class="avatar-container">
                        <div class="avatar-placeholder"
                            :style="personalInfo.avatar ? `background-image: url('${personalInfo.avatar}')` : ''"></div>
                    </div>
                    <div class="profile-stats">
                        <div class="stat-item" v-for="(stat, index) in personalInfo.stats" :key="index">
                            <div class="stat-value">{{ stat.value }}</div>
                            <div class="stat-label">{{ stat.label }}</div>
                        </div>
                    </div>
                    <div class="about-btn" @click="handleAboutClick">{{ personalInfo.aboutBtnText }}</div>
                </div> <!-- 右侧内容区域 -->
                <div class="profile-right">
                    <!-- 右上角一句话介绍/通知区域 -->
                    <div class="profile-intro">
                        <p class="tagline">「{{ personalInfo.tagline }}」</p>
                    </div> <!-- 右下角每日动态格子 -->
                    <Activity :mobile-mode="isMobile" />
                </div>
            </div>
        </section> <!-- 内容展示区 - 分两列 -->
        <div class="content-columns">
            <!-- 左侧主要内容列 -->
            <div class="main-column">
                <!-- 我的文章部分的模板修改 -->
                <section class="section academic-notes">
                    <div class="section-header">
                        <h2>{{ academicSection.title }}</h2>
                        <span class="view-all" @click="goToResearch">{{ academicSection.viewAllText }}</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">{{ academicSection.description }}</p>
                        <div class="article-grid">
                            <!-- 使用v-for循环渲染文章卡片 -->
                            <div class="article-card" v-for="article in academicSection.articles" :key="article.id"
                                @click="goToArticle(article.id)">
                                <div class="article-image" :style="`background-image: url('${article.image}')`"></div>
                                <div class="article-content">
                                    <h3 class="article-title">{{ article.title }}</h3>
                                    <div class="article-tags">
                                        <span class="tag" v-for="(tag, index) in article.tags" :key="index">{{ tag
                                            }}</span>
                                    </div>
                                    <p class="article-summary">{{ article.summary }}</p>
                                    <!-- 点赞和评论 -->
                                    <div class="interaction-stats">
                                        <div class="stat-action">
                                            <i class="icon-heart"></i>
                                            <span>{{ article.likes }}</span>
                                        </div>
                                        <div class="stat-action">
                                            <i class="icon-comment"></i>
                                            <span>{{ article.comments }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> <!-- 我的项目 -->
                <section class="section workshop">
                    <div class="section-header">
                        <h2>{{ workshopSection.title }}</h2>
                        <span class="view-all" @click="goToStudio">{{ workshopSection.viewAllText }}</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">{{ workshopSection.description }}</p>
                        <div class="project-showcase">
                            <div class="project-card" v-for="project in workshopSection.projects" :key="project.id"
                                @click="goToArticle(project.id)">
                                <div class="project-image" :style="`background-image: url('${project.image}')`"></div>
                                <div class="project-content">
                                    <h3 class="project-title">{{ project.title }}</h3>
                                    <div class="project-tags">
                                        <span class="tag" v-for="(tag, index) in project.tags" :key="index">{{ tag
                                            }}</span>
                                    </div>
                                    <p class="project-summary">{{ project.summary }}</p>
                                    <div class="project-meta">
                                        <!-- <span class="meta-item"><i :class="project.statusIcon"></i> {{ project.status
                                            }}</span> -->
                                        <span class="meta-item"><i class="fa fa-calendar"></i> {{ project.date }}</span>
                                        <!-- 点赞和评论 -->
                                        <div class="interaction-stats">
                                            <div class="stat-action">
                                                <i class="icon-heart"></i>
                                                <span>{{ project.likes }}</span>
                                            </div>
                                            <div class="stat-action">
                                                <i class="icon-comment"></i>
                                                <span>{{ project.comments }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div> <!-- 朋友圈（开发中） - 全宽度区域 -->
        <section class="section life-section">
            <div class="section-header">
                <h2>{{ lifeSection.title }}</h2>
                <span class="view-all">{{ lifeSection.viewAllText }}</span>
            </div>
            <div class="section-content">
                <p class="section-desc">{{ lifeSection.description }}</p>
                <div class="media-gallery">
                    <!-- 照片/视频网格 -->
                    <div class="media-item" v-for="media in lifeSection.mediaItems" :key="media.id"
                        @click="showPhotoGallery(index)">
                        <div class="media-image" :style="`background-image: url('${media.images[0].url}')`"></div>
                        <div class="media-overlay">
                            <h3 class="media-title">{{ media.title }}</h3>
                            <div class="media-tags">
                                <span class="tag" v-for="(tag, index) in media.tags" :key="index">{{ tag }}</span>
                            </div>
                            <p class="media-summary">{{ media.location }}</p>
                            <!-- 点赞和评论 -->
                            <div class="interaction-stats media-stats">
                                <div class="stat-action">
                                    <i class="icon-heart"></i>
                                    <span>{{ media.likes }}</span>
                                </div>
                                <div class="stat-action">
                                    <i class="icon-comment"></i>
                                    <span>{{ media.comments.length }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 添加照片画廊组件 -->
            <PhotoGallery v-model:visible="showPhotoDialog" :photos="lifeSection.mediaItems"
                :initialPhotoIndex="currentPhotoIndex" :heartFilledIcon="heartFilledIcon"
                :heartOutlineIcon="heartOutlineIcon" :commentIcon="commentIcon" :likedPhotoIds="likedPhotoIds"
                @like="handlePhotoLike" @comment="handlePhotoComment" />
        </section>
        <!-- 弹窗 -->
        <el-dialog v-model="showApplyDialog" title="申请友情链接" width="500px">
            <el-alert title="申请前请先将本站添加到您的网站" type="warning" :closable="false" show-icon style="margin-bottom: 20px"
                description="本站名称：个人博客 | 地址：http://your-domain.com" />

            <el-form :model="applyForm" label-width="80px">
                <el-form-item label="网站名称" required>
                    <el-input v-model="applyForm.name" placeholder="请输入网站名称" />
                </el-form-item>
                <el-form-item label="网站链接" required>
                    <el-input v-model="applyForm.url" placeholder="https://example.com" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="applyForm.description" type="textarea" placeholder="一句话介绍您的网站" />
                </el-form-item>
                <el-form-item label="Logo">
                    <el-input v-model="applyForm.logo" placeholder="Logo图片链接 (可选)" />
                </el-form-item>
                <el-form-item label="联系邮箱">
                    <el-input v-model="applyForm.email" placeholder="方便审核结果通知 (可选)" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showApplyDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitApply" :loading="submittingApply">提交申请</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 底部区域 -->
        <div class="bottom-sections">
            <!-- 互动交集 -->
            <section class="section interaction">
                <div class="section-header">
                    <h2>互动交集</h2>
                </div>
                <div class="section-content">
                    <div class="friends-links">
                        <div class="friend-link-header">
                            <h3>友情链接</h3>
                        </div>
                        <div class="links-grid">
                            <!-- 使用v-for循环渲染友链 -->
                            <a v-for="link in friendLinks" :key="link.id"
                                :href="link.url.startsWith('http') ? link.url : 'http://' + link.url" target="_blank"
                                class="friend-link" :title="link.description">
                                <div class="link-icon">
                                    <img :src="link.logo" :alt="`${link.name} logo`" class="link-logo">
                                </div>
                                <div class="link-info">
                                    <span class="link-name">{{ link.name }}</span>
                                    <span class="link-desc">{{ link.description }}</span>
                                </div>
                            </a>
                        </div>
                        <div class="apply-link-container">
                            <button class="apply-link-btn" @click="showApplyDialog = true">
                                <span>➕ 申请加入友链</span>
                            </button>
                        </div>
                    </div>
                    <div class="message-board">
                        <h3>留言板</h3> <!-- 留言输入区域 -->
                        <div class="message-input-container">
                            <textarea v-model="messageInput" placeholder="写下你的留言..." class="message-input"></textarea>
                            <div class="message-actions">
                                <div class="privacy-toggle">
                                    <input type="checkbox" id="privacy-toggle" v-model="isPublic">
                                    <label for="privacy-toggle">
                                        <span>{{ isPublic ? '公开' : '私密' }}</span>
                                    </label>
                                </div> <button class="send-btn" @click="addMessage">发送</button>
                            </div>
                        </div> <!-- 留言展示区域 -->
                        <div class="message-list">
                            <div class="message-item" v-for="message in displayMessages" :key="message.id">
                                <div class="message-avatar">
                                    <img :src="message.avatar" :alt="`${message.author} avatar`">
                                </div>
                                <div class="message-content">
                                    <div class="message-header">
                                        <span class="message-author">{{ message.author }}</span>
                                        <span class="message-date">{{ message.date }}</span>
                                    </div>
                                    <p class="message-text">{{ message.content }}</p>
                                </div>
                            </div>
                        </div> <!-- 查看更多按钮 -->
                        <button class="view-more-btn" @click="viewMoreMessages">仅展示 5 个最新留言</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { getArticles } from '../api/article';
import { getMessages, addMessage as apiAddMessage } from '../api/message';
import { getFriendLinks, createFriendLinkRequest } from '../api/friend_link';
import { baseUrl } from '@/common/config';
import { ElMessage } from 'element-plus';
import Activity from '../components/Activity.vue'
import { currentTheme } from '../stores/themeStore'
import PhotoGallery from './PhotoGallery.vue';
// 导入需要的图标
import heartFilledIcon from '@/assets/icons/heart-filled.png';
import heartOutlineIcon from '@/assets/icons/heart.png';
import commentIcon from '@/assets/icons/comment.png';
const router = useRouter();

// 导航函数
const goToArticle = (id) => {
    router.push(`/article/${id}`);
};

const goToResearch = () => {
    router.push('/research');
};

const goToStudio = () => {
    router.push('/studio');
};

const handleAboutClick = () => {
    router.push('/about');
};

// 添加响应式布局相关的状态
const isMobile = ref(false);
const windowWidth = ref(window.innerWidth);
// 添加照片画廊相关状态
const showPhotoDialog = ref(false);
const currentPhotoIndex = ref(0);
const likedPhotoIds = ref([]);
// 显示照片画廊
const showPhotoGallery = (index) => {
    currentPhotoIndex.value = index;
    showPhotoDialog.value = true;
};// 处理照片点赞
const handlePhotoLike = (photoId) => {
    const mediaIndex = lifeSection.value.mediaItems.findIndex(media => media.id === photoId);
    if (mediaIndex === -1) return; if (likedPhotoIds.value.includes(photoId)) {
        // 取消点赞
        likedPhotoIds.value = likedPhotoIds.value.filter(id => id !== photoId);
        lifeSection.value.mediaItems[mediaIndex].likes--;
    } else {
        // 添加点赞
        likedPhotoIds.value.push(photoId);
        lifeSection.value.mediaItems[mediaIndex].likes++;
    }
};// 处理照片评论
const handlePhotoComment = ({ photoId, comment }) => {
    const mediaIndex = lifeSection.value.mediaItems.findIndex(media => media.id === photoId);
    if (mediaIndex === -1) return; lifeSection.value.mediaItems[mediaIndex].comments.unshift(comment);
};// 检测当前设备窗口大小并设置isMobile状态
const checkScreenSize = () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = windowWidth.value < 768;
};// 在组件挂载前检测屏幕尺寸
onBeforeMount(() => {
    checkScreenSize();
});// 在组件挂载后添加窗口大小变化事件监听
onMounted(() => {
    window.addEventListener('resize', checkScreenSize);    // 读取sessionStorage中的主题设置
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
        currentTheme.value = savedTheme;
    }
    loadData();
});// 在组件卸载时移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
});// 个人介绍数据
const personalInfo = ref({
    sectionTitle: '个人介绍',
    avatar: 'https://picsum.photos/600/400?random=8', // 可以添加头像URL
    stats: [
        { value: 528, label: '访问量' },
        { value: 42, label: '文章' },
        { value: 365, label: '运营天数' }
    ],
    aboutBtnText: '关于我',
    tagline: '浅夜未央，星河流转，无论走到哪里，都是追寻自我的旅程'
});

// 我的文章数据
const academicSection = ref({
    title: '我的文章',
    description: '分享科研心得、学术观点与专业探索',
    viewAllText: '查看全部',
    articles: []
});

// 我的项目数据
const workshopSection = ref({
    title: '我的项目',
    description: '展示个人项目、工具开发与方法分享',
    viewAllText: '查看全部',
    projects: []
});

// 加载数据
const loadData = async () => {
    try {
        // 加载文章 (前3篇)
        const articleRes = await getArticles({
            page: 1,
            page_size: 3,
            status: 'published',
            category: 'research'
        });
        if (articleRes && articleRes.items) {
            academicSection.value.articles = articleRes.items.map(item => ({
                id: item.id,
                title: item.title,
                image: item.cover_image_url ? baseUrl + item.cover_image_url : '', // 处理图片URL
                summary: item.summary,
                tags: typeof item.tags === 'string' ? item.tags.split(',') : (Array.isArray(item.tags) ? item.tags : [item.category]),
                likes: 0, // 接口暂无 likes 字段，需根据实际情况调整
                comments: 0 // 接口暂无 comments 字段
            }));
        }

        // 加载项目 (前2篇)
        const projectRes = await getArticles({
            page: 1,
            page_size: 2,
            status: 'published',
            category: 'studio'
        });
        if (projectRes && projectRes.items) {
            workshopSection.value.projects = projectRes.items.map(item => ({
                id: item.id,
                title: item.title,
                image: item.cover_image_url ? baseUrl + item.cover_image_url : '',
                summary: item.summary,
                tags: typeof item.tags === 'string' ? item.tags.split(',') : (Array.isArray(item.tags) ? item.tags : [item.category]),
                date: item.created_at ? item.created_at.substring(0, 10) : '',
                likes: 0,
                comments: 0
            }));
        }
    } catch (error) {
        console.error('Failed to load home data:', error);
    }

    try {
        const linkRes = await getFriendLinks();
        if (linkRes) {
            friendLinks.value = linkRes;
        }

        await fetchMessages();
    } catch (err) {
        console.error('Failed to load friend links', err);
    }
};

// 友链申请相关
const showApplyDialog = ref(false);
const applyForm = ref({
    name: '',
    url: '',
    description: '',
    logo: '',
    email: ''
});
const submittingApply = ref(false);

const submitApply = async () => {
    if (!applyForm.value.name || !applyForm.value.url) {
        ElMessage.warning('请填写网站名称和链接');
        return;
    }

    submittingApply.value = true;
    try {
        await createFriendLinkRequest(applyForm.value);
        ElMessage.success('申请已提交，请等待审核');
        showApplyDialog.value = false;
        applyForm.value = { name: '', url: '', description: '', logo: '', email: '' }; // 重置表单
    } catch (e) {
        // Interceptor already handles error messages, but we catch here to stop loading state
        // If we want to show generic message only if interceptor didn't show one, it's tricky.
        // But usually interceptor shows error.
    } finally {
        submittingApply.value = false;
    }
};

// 朋友圈（开发中）数据
const lifeSection = ref({
    title: '朋友圈（开发中）',
    description: '生活瞬间、旅行记忆与个人故事集',
    viewAllText: '查看全部',
    mediaItems: [
        {
            id: 1,
            title: '山水之间',
            location: '瑞士阿尔卑斯山',
            date: '2023年7月15日',
            description: '<h1>阿尔卑斯山脉</h1><p>湛蓝的天空下，雪山与湖泊构成了一幅完美的自然画卷。</p><h2>拍摄体验</h2><p>在海拔3000米的山顶，寒冷但壮观的景色让人屏息。</p>',
            tags: ['旅行', '自然', '山脉'],
            likes: 128,
            comments: [
                {
                    author: '旅行者小李',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    text: '太美了！我也去过这里，景色确实令人震撼',
                    time: '2小时前'
                },
                {
                    author: '摄影师大卫',
                    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
                    text: '构图非常棒，请问用的什么镜头拍摄的？',
                    time: '1天前'
                }
            ],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '阿尔卑斯山全景'
                },
                {
                    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '山顶日出'
                },
                {
                    url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '山间小屋'
                }
            ]
        },
        {
            id: 2,
            title: '晨光早餐',
            location: '巴黎咖啡馆',
            date: '2023年8月3日',
            description: '<h1>巴黎的早晨</h1><p>在巴黎街头的小咖啡馆享用的丰盛早餐，阳光透过窗户撒在桌上，温暖而惬意。</p><p>这是我在欧洲旅行中最喜欢的一餐。</p>',
            tags: ['美食', '旅行', '早餐'],
            likes: 85,
            comments: [
                {
                    author: '美食博主',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    text: '看起来太美味了！巴黎的早餐真的很精致',
                    time: '5小时前'
                }
            ],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '法式早餐'
                },
                {
                    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '咖啡和可颂'
                }
            ]
        },
        {
            id: 3,
            title: '傍晚海滩',
            location: '巴厘岛库塔海滩',
            date: '2023年9月20日',
            description: '<h1>巴厘岛落日</h1><p>夕阳西下，海浪轻拍沙滩，天空被染成金色和紫色，这是一天中最美的时刻。</p><h2>摄影笔记</h2><p>使用了长曝光技术捕捉海浪的柔和线条。</p>',
            tags: ['旅行', '海滩', '夕阳'],
            likes: 216,
            comments: [
                {
                    author: '岛主小王',
                    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                    text: '巴厘岛是我最爱的度假胜地，这张照片拍得太棒了',
                    time: '3天前'
                },
                {
                    author: '摄影爱好者',
                    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
                    text: '长曝光效果很赞，水面看起来如丝绸般顺滑',
                    time: '5天前'
                },
                {
                    author: '旅行达人',
                    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                    text: '我也计划这个月去巴厘岛，有什么好的建议吗？',
                    time: '1周前'
                }
            ],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '夕阳海滩'
                },
                {
                    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '海滩冲浪'
                },
                {
                    url: 'https://images.unsplash.com/photo-1519882189396-71b93cb121af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '沙滩漫步'
                },
                {
                    url: 'https://images.unsplash.com/photo-1484821582734-6692f7b1c954?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '热带风情'
                }
            ]
        },
        {
            id: 4,
            title: '冰川湖泊',
            location: '新西兰',
            date: '2022年12月10日',
            description: '<h1>新西兰的纯净之美</h1><p>澄澈的湖水映照着雪山，宛如一面巨大的镜子，反射出大自然的壮丽景色。</p><p>这是我见过最纯净的湖水。</p>',
            tags: ['自然', '湖泊', '雪山'],
            likes: 143,
            comments: [],
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    caption: '冰川湖全景'
                }
            ]
        }
    ]
});// 友情链接数据
const friendLinks = ref([]);
// 留言板数据
const messageInput = ref(''); // 用户输入的留言内容
const isPublic = ref(true); // 是否是公开留言 (默认公开)
const messages = ref([]);

// 格式化日期时间
const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    // 兼容 iOS/Safari 的日期格式 (将空格替换为T)
    const safeDateStr = typeof dateStr === 'string' ? dateStr.replace(' ', 'T') : dateStr;
    const date = new Date(safeDateStr);

    if (isNaN(date.getTime())) return dateStr;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const fetchMessages = async () => {
    try {
        const res = await getMessages(1, 10);
        if (res && res.list) {
            messages.value = res.list.map(m => ({
                id: m.id,
                author: m.author || '访客',
                avatar: m.avatar || 'https://www.mtmba.com/static/inxweb/img/avatar-boy.gif',
                content: m.content,
                date: formatDateTime(m.created_at),
                isPrivate: !!m.is_private
            }));
        }
    } catch (err) {
        console.error('Failed to load messages', err);
    }
};

const displayMessages = computed(() => {
    return messages.value;
});

// 添加留言方法
const addMessage = async () => {
    if (!messageInput.value.trim()) {
        ElMessage.warning('请输入留言内容');
        return;
    }

    // 获取当前用户信息
    let author = '访客';
    let avatar = 'https://www.mtmba.com/static/inxweb/img/avatar-boy.gif';
    let email = '';

    const userStr = sessionStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            author = user.nickname || user.username || '用户';
            // 如果用户有头像则使用，否则使用默认头像(这里假设用户对象里有avatar字段且不为空)
            if (user.avatar) {
                avatar = user.avatar;
            }
            email = user.email || '';
        } catch (e) {
            console.error('Failed to parse user info', e);
        }
    }

    try {
        await apiAddMessage({
            content: messageInput.value,
            isPrivate: !isPublic.value,
            author,
            avatar,
            email
        });
        ElMessage.success('留言成功');
        messageInput.value = '';
        isPublic.value = true;
        await fetchMessages();
    } catch (err) {
        console.error('Failed to add message', err);
    }
};

// 日期格式化函数
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
        month: `${date.getMonth() + 1}月`,
        day: date.getDate(),
        year: date.getFullYear()
    };
};

</script>
<style scoped>
/* 主题变量定义 */
.dark {
    --bg-primary: rgba(25, 25, 35, 0.2);
    --bg-secondary: rgba(30, 30, 40, 0.3);
    --bg-tertiary: rgba(40, 40, 55, 0.3);
    --text-primary: white;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --border-color: rgba(255, 255, 255, 0.5);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --gradient-text: linear-gradient(45deg, #ffffff, #b8c6db);
    --hover-bg: rgba(255, 255, 255, 0.1);
    --card-bg: rgba(30, 30, 40, 0.4);
    --input-bg: rgba(255, 255, 255, 0.05);
}

.light {
    --bg-primary: rgba(255, 255, 255, 0.3);
    --bg-secondary: rgba(255, 255, 255, 0.4);
    --bg-tertiary: rgba(235, 235, 245, 0.3);
    --text-primary: #333;
    --text-secondary: #555;
    --border-color: rgba(255, 255, 255, 0.6);
    --shadow-color: rgba(0, 0, 0, 0.1);
    --gradient-text: linear-gradient(45deg, #333, #666);
    --hover-bg: rgba(0, 0, 0, 0.05);
    --card-bg: rgba(255, 255, 255, 0.4);
    --input-bg: rgba(0, 0, 0, 0.03);
}

/* 主题切换按钮样式 */
.main {
    width: 100%;
    max-width: 1400px;
    background-color: transparent;
    min-height: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
    color: var(--text-primary);
    /* font-family: 'Helvetica Neue', Arial, sans-serif; */
    box-sizing: border-box;
}

/* 通用板块样式 */
.section {
    border: 1px solid var(--border-color);
    border-radius: 16px;
    margin-bottom: 30px;
    padding: 24px;
    position: relative;
    backdrop-filter: blur(10px);
    background-color: var(--bg-primary);
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px var(--shadow-color),
        0 2px 8px rgba(0, 0, 0, 0.15);
}

.section:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px var(--shadow-color),
        0 4px 10px rgba(0, 0, 0, 0.2),
        0 0 1px var(--border-color);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 16px;
    margin-bottom: 24px;
}

.section-header h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    position: relative;
    letter-spacing: 0.5px;
    color: var(--text-primary);
}

.section-header h2::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(--text-primary) 0%, transparent 100%);
}

.view-all {
    font-size: 14px;
    opacity: 0.7;
    cursor: pointer;
    transition: all 0.2s;
    padding: 4px 10px;
    border-radius: 12px;
    background-color: var(--hover-bg);
}

.view-all:hover {
    opacity: 1;
    background-color: var(--hover-bg);
}

.section-desc {
    font-size: 15px;
    opacity: 0.8;
    margin-bottom: 20px;
    color: var (--text-secondary);
}

/* 个人介绍区域 */
.personal-intro {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
}

.personal-intro .section-content {
    display: flex;
    gap: 25px;
}

/* 左侧区域 */
.profile-left {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avatar-container {
    margin-bottom: 20px;
}

/* 为头像添加背景图片支持 */
.avatar-placeholder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.08);
    background-size: cover;
    background-position: center;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25),
        inset 0 0 0 2px rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.avatar-placeholder:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.3);
}

/* 数据统计样式 */
.profile-stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;
}

.stat-item {
    text-align: center;
}

.stat-value {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 12px;
    opacity: 0.7;
}

/* 关于我按钮 */
.about-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: var(--text-primary);
    /* 修改这一行，从固定的 white 改为使用主题变量 */
    padding: 8px 30px;
    border-radius: 20px;
    font-size: 14px;
    text-align: center;
    height: 40px;
    line-height: 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.about-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

/* 右侧区域 */
.profile-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 右侧上部区域 - 介绍 */
.profile-intro {
    background-color: var(--bg-tertiary);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px var(--shadow-color);
}

.tagline {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px var(--shadow-color);
    line-height: 1.4;
    text-align: center;
    font-style: italic;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

/* 颜色图例样式 */
.color-legend {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 12px;
    padding: 5px;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.color-box {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 5px;
}

.color-box.work {
    background-color: #5470c6;
}

.color-box.study {
    background-color: #9a60b4;
}

.color-box.play {
    background-color: #ee6666;
}

.color-box.rest {
    background-color: #73c0de;
}

.color-box.relax {
    background-color: #3ba272;
}

.color-box.busy {
    background-color: #fc8452;
}

.legend-item span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
}

/* 内容列布局 */
.content-columns {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
}

.main-column {
    flex: 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.side-column {
    flex: 2;
}

/* 我的文章 */
.article-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.article-card-placeholder {
    height: 120px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 我的项目 */
.project-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.project-card-placeholder {
    height: 150px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 朋友圈（开发中） */
.media-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.media-item-placeholder {
    height: 180px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 互动交集 */
.interaction .section-content {
    display: flex;
    gap: 30px;
}

.friends-links {
    flex: 2;
}

.message-board {
    flex: 1;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.link-placeholder {
    height: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

.friend-link {
    display: flex;
    align-items: flex-start;
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 15px;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px var(--shadow-color);
    height: 90px;
}

.friend-link:hover {
    transform: translateY(-4px);
    background-color: var(--hover-bg);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.link-icon {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin-right: 12px;
    overflow: hidden;
    flex-shrink: 0;
    margin-top: 2px;
}

.link-logo {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

.link-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* 配合文本溢出隐藏 */
    justify-content: flex-start;
    height: 100%;
}

.link-name {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
}

.link-desc {
    font-size: 12px;
    opacity: 0.8;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
}

.apply-link-container {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}

.apply-link-btn {
    width: 90%;
    background-color: transparent;
    border: 1px dashed rgba(255, 255, 255, 0.3);
    color: var(--text-secondary);
    padding: 10px 0;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.apply-link-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.6);
    color: var(--text-primary);
}

/* 各种占位符元素的样式修改 */
.article-card-placeholder,
.project-card-placeholder,
.thought-item-placeholder,
.update-item-placeholder,
.media-item-placeholder,
.link-placeholder {
    background-color: rgba(255, 255, 255, 0.07);
    /* 稍微调亮 */
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
}

.article-card-placeholder:hover,
.project-card-placeholder:hover,
.thought-item-placeholder:hover,
.update-item-placeholder:hover,
.media-item-placeholder:hover,
.link-placeholder:hover {
    background-color: rgba(255, 255, 255, 0.1);
    /* 悬停时更亮 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

h3 {
    font-size: 18px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 15px;
}

/* 我的文章卡片样式 */
.article-card {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--card-bg);
    box-shadow: 0 8px 20px var(--shadow-color);
    transition: all 0.3s ease;
    height: 140px;
    /* 固定高度，更小巧 */
    display: flex;
    flex-direction: row;
    /* 改为水平排列：左图右详情 */
    cursor: pointer;
}

.article-card:hover {
    transform: translateY(-4px);
    /* 悬浮移动幅度减小 */
    box-shadow: 0 10px 25px var(--shadow-color);
}

.article-image {
    width: 140px;
    /* 左侧图片固定宽度 */
    height: 100%;
    /* 高度占满 */
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
    /* 防止图片被压缩 */
}

/* 修改渐变方向为从右向左，或者移除 */
.article-image::after {
    display: none;
    /* 移除图片上的渐变遮罩 */
}

.article-content {
    padding: 12px 16px;
    /* 减小内边距 */
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* 防止内容溢出 */
}

.article-title {
    margin: 0 0 6px 0;
    font-size: 16px;
    /* 减小标题字号 */
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.3px;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    white-space: nowrap;
    /* 标题单行显示 */
    overflow: hidden;
    text-overflow: ellipsis;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 6px;
}

.article-summary {
    margin: 0;
    font-size: 13px;
    /* 减小摘要字号 */
    line-height: 1.4;
    opacity: 0.8;
    flex: 1;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 限制摘要显示2行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 我的项目卡片样式 */
.project-card {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--card-bg);
    box-shadow: 0 8px 20px var(--shadow-color);
    transition: all 0.3s ease;
    height: 100%;
    /* 高度自适应 */
    display: flex;
    flex-direction: column;
    /* 改回垂直排列：上图下详情 */
    cursor: pointer;
}

.project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px var(--shadow-color);
}

.project-image {
    width: 100%;
    /* 宽度占满 */
    height: 270px;
    /* 固定高度 */
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
}

.project-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to top, var(--card-bg), transparent);
    display: block;
}

.project-content {
    padding: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
}

.project-summary {
    margin: 0 0 15px 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.8;
    flex: 1;
    color: var(--text-secondary);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 项目卡片调整 */
.project-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 13px;
    opacity: 0.7;
    color: var(--text-secondary);
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.thought-date {
    min-width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-tertiary);
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    font-size: 13px;
    white-space: nowrap;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.thought-item:hover .thought-date {
    background-color: rgba(50, 50, 70, 0.7);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2),
        inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.thought-date::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

/* 拆分日期显示为两部分 */
.thought-date::after {
    content: attr(data-date);
    display: none;
    /* 隐藏原始日期 */
}

.thought-date .date-month,
.thought-date .date-day,
.thought-date .date-year {
    display: block;
    text-align: center;
}

.thought-date .date-day {
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    margin: 4px 0;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.thought-date .date-month {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 2px;
}

.thought-date .date-year {
    font-size: 12px;
    opacity: 0.7;
    margin-top: 2px;
}

.thought-content {
    flex: 1;
}

.thought-title {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    background: var(--gradient-text);
    color: var(--text-secondary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.thought-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

.thought-summary {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.8;
    color: var(--text-secondary);
}

/* 朋友圈（开发中）卡片样式 */
.media-item {
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    height: 200px;
    box-shadow: 0 8px 20px var(--shadow-color);
    transition: all 0.3s ease;
    cursor: pointer;
}

.media-item:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 30px var(--shadow-color);
}

.media-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
}

.media-item:hover .media-image {
    transform: scale(1.1);
}

.media-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
    transition: all 0.3s ease;
    /* 确保所有文本是白色的 */
    color: white !important;
}

.media-item:hover .media-overlay {
    padding-bottom: 30px;
}

.media-title {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    text-shadow: 0 2px 4px var(--shadow-color);
}

.media-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

/* 确保媒体卡片中的标签文字为白色 */
.media-tags .tag {
    color: white !important;
    background-color: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.3);
}

.media-summary {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.media-item:hover .media-summary {
    opacity: 0.9;
    height: auto;
}

/* 标签样式 */
.tag {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
    background-color: var(--hover-bg);
    color: var(--text-secondary);
    backdrop-filter: blur(5px);
    transition: all 0.2s ease;
}

.tag:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}

/* 随机标签颜色 */
.article-tags .tag:nth-child(3n+1),
.project-tags .tag:nth-child(3n+1),
.thought-tags .tag:nth-child(3n+1),
.media-tags .tag:nth-child(3n+1) {
    background-color: rgba(84, 112, 198, 0.2);
    border: 1px solid rgba(84, 112, 198, 0.3);
}

.article-tags .tag:nth-child(3n+2),
.project-tags .tag:nth-child(3n+2),
.thought-tags .tag:nth-child(3n+2),
.media-tags .tag:nth-child(3n+2) {
    background-color: rgba(154, 96, 180, 0.2);
    border: 1px solid rgba(154, 96, 180, 0.3);
}

.article-tags .tag:nth-child(3n+3),
.project-tags .tag:nth-child(3n+3),
.thought-tags .tag:nth-child(3n+3),
.media-tags .tag:nth-child(3n+3) {
    background-color: rgba(238, 102, 102, 0.2);
    border: 1px solid rgba(238, 102, 102, 0.3);
}

/* 移除原占位符样式 */
.article-card-placeholder,
.project-card-placeholder,
.thought-item-placeholder,
.media-item-placeholder {
    display: none;
}

/* 点赞和评论图标样式 */
.interaction-stats {
    display: flex;
    gap: 15px;
}

.project-meta .interaction-stats {
    margin-top: 0;
    margin-left: auto;
}

.stat-action {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    opacity: 0.8;
    transition: all 0.2s ease;
    cursor: pointer;
}

.stat-action:hover {
    opacity: 1;
    transform: translateY(-2px);
}

.stat-action i {
    font-size: 15px;
}

.icon-heart::before {
    content: '♥';
    color: rgba(238, 102, 102, 0.9);
}

.icon-comment::before {
    content: '💬';
    color: rgba(115, 192, 222, 0.9);
}

/* 朋友圈（开发中）调整 */
.media-stats {
    margin-top: 10px;
    opacity: 0;
    transition: all 0.3s ease;
}

.media-item:hover .media-stats {
    opacity: 1;
}

/* 让项目卡片的内容区更灵活对齐 */
.article-content,
.project-content {
    display: flex;
    flex-direction: column;
}

.article-summary,
.project-summary {
    flex: 1;
}

/* 留言板样式 */
.message-board {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 6px 20px var(--shadow-color);
}

/* 留言输入区域 */
.message-input-container {
    margin-bottom: 20px;
}

.message-input {
    width: 100%;
    height: 100px;
    background-color: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 12px;
    color: var(--text-primary);
    font-size: 14px;
    resize: none;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.message-input:focus {
    outline: none;
    background-color: var(--input-bg);
    border-color: var(--border-color);
}

.message-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.privacy-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--text-primary);
}

.privacy-toggle input[type="checkbox"] {
    appearance: none;
    width: 40px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    position: relative;
    background-color: rgba(153, 96, 180, 0.213);
    cursor: pointer;
    transition: all 0.3s ease;
}

.privacy-toggle input[type="checkbox"]:checked {
    background-color: rgba(153, 96, 180, 0.778);
}

.privacy-toggle input[type="checkbox"]::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
}

.privacy-toggle input[type="checkbox"]:checked::before {
    left: 22px;
}

.send-btn {
    background-color: rgba(84, 112, 198, 0.6);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.send-btn:hover {
    background-color: rgba(84, 112, 198, 0.8);
    transform: translateY(-2px);
}

/* 留言列表 */
.message-list {
    margin-bottom: 15px;
}

.message-item {
    display: flex;
    margin-bottom: 15px;
    background-color: var(--input-bg);
    border-radius: 10px;
    padding: 12px;
    transition: all 0.3s ease;
}

.message-item:hover {
    background-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
}

.message-avatar {
    margin-right: 12px;
}

.message-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.message-content {
    flex: 1;
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.message-author {
    font-weight: 500;
    font-size: 14px;
    color: var(--text-primary);
}

.message-date {
    font-size: 12px;
    color: var(--text-secondary);
    opacity: 0.8;
}

.message-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-secondary);
}

/* 查看更多按钮 */
.view-more-btn {
    width: 100%;
    background-color: var(--hover-bg);
    border: none;
    border-radius: 8px;
    color: var(--text-primary);
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-more-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

/* 响应式布局媒体查询 */
@media (max-width: 1200px) {

    /* .article-grid 已调整为单列，此处移除覆盖 */
    .media-gallery {
        grid-template-columns: repeat(3, 1fr);
    }

    .links-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
    .main-column {
        grid-template-columns: 1fr;
    }

    .personal-intro .section-content {
        flex-direction: column;
    }

    .profile-left {
        flex: 0 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .avatar-container {
        margin-bottom: 0;
        margin-right: 20px;
    }

    .avatar-placeholder {
        width: 100px;
        height: 100px;
    }

    .profile-stats {
        flex: 1;
        justify-content: space-around;
        margin-bottom: 0;
    }

    .about-btn {
        margin-top: 15px;
        width: 100%;
    }

    .media-gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .main {
        padding: 20px 15px;
    }

    .content-columns {
        flex-direction: column;
    }

    /* .article-grid 已全局调整 */
    .project-showcase {
        grid-template-columns: 1fr;
    }

    .interaction .section-content {
        flex-direction: column;
    }

    .friends-links,
    .message-board {
        width: 100%;
    }

    .section-header h2 {
        font-size: 20px;
    }

    .profile-left {
        flex-direction: column;
        align-items: center;
    }

    .avatar-container {
        margin-right: 0;
        margin-bottom: 15px;
    }

    .profile-stats {
        width: 100%;
        margin-bottom: 15px;
    }

    .thought-item {
        flex-direction: column;
    }

    .thought-date {
        min-width: 100%;
        height: auto;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 10px;
    }

    .thought-date .date-month,
    .thought-date .date-day,
    .thought-date .date-year {
        display: inline-block;
        margin: 0 5px;
    }

    .links-grid {
        grid-template-columns: 1fr;
    }

    /* 移动端朋友圈（开发中）卡片默认显示摘要和点赞信息 */
    .media-summary {
        opacity: 0.9;
        height: auto;
        margin-bottom: 8px;
    }

    .media-stats {
        opacity: 1;
    }

    .media-overlay {
        padding-bottom: 25px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.3));
    }

    /* 确保媒体项目有足够的空间显示内容 */
    .media-item {
        height: 220px;
    }
}

@media (max-width: 576px) {
    .main {
        padding: 15px 10px;
    }

    .article-card {
        height: 120px;
        /* 移动端高度减小 */
    }

    .project-card {
        height: auto;
    }

    .article-image {
        width: 110px;
        /* 移动端图片变窄 */
    }

    .project-image {
        width: 100%;
        height: 140px;
        /* 移动端图片高度 */
    }

    .article-grid {
        grid-template-columns: 1fr;
    }

    .media-gallery {
        grid-template-columns: 1fr;
    }

    .tagline {
        font-size: 16px;
    }

    .article-title,
    .project-title,
    .media-title {
        font-size: 16px;
    }

    .article-summary,
    .project-summary {
        font-size: 12px;
    }

    .section {
        padding: 15px;
    }

    .section-desc {
        font-size: 13px;
    }

    .stat-value {
        font-size: 20px;
    }

    .stat-label {
        font-size: 10px;
    }
}
</style>