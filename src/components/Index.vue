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
                </div>

                <!-- 右侧内容区域 -->
                <div class="profile-right">
                    <!-- 右上角一句话介绍/通知区域 -->
                    <div class="profile-intro">
                        <p class="tagline">「{{ personalInfo.tagline }}」</p>
                    </div>

                    <!-- 右下角每日动态格子 -->
                    <Activity :mobile-mode="isMobile" />
                </div>
            </div>
        </section>

        <!-- 内容展示区 - 分两列 -->
        <div class="content-columns">
            <!-- 左侧主要内容列 -->
            <div class="main-column">
                <!-- 学术札记部分的模板修改 -->
                <section class="section academic-notes">
                    <div class="section-header">
                        <h2>{{ academicSection.title }}</h2>
                        <span class="view-all">{{ academicSection.viewAllText }}</span>
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
                </section>

                <!-- 实践工坊 -->
                <section class="section workshop">
                    <div class="section-header">
                        <h2>{{ workshopSection.title }}</h2>
                        <span class="view-all">{{ workshopSection.viewAllText }}</span>
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

            <!-- 右侧次要内容列 -->
            <div class="side-column">

                <!-- 最近更新 - 额外添加的板块 -->
                <section class="section recent-updates">
                    <div class="section-header">
                        <h2>最近更新</h2>
                    </div>
                    <div class="section-content">
                        <div class="updates-list">
                            <!-- 更新列表 -->
                            <div class="update-item-placeholder"></div>
                            <div class="update-item-placeholder"></div>
                        </div>
                    </div>
                </section>

                <!-- 认知轨迹 -->
                <section class="section thoughts">
                    <div class="section-header">
                        <h2>{{ thoughtsSection.title }}</h2>
                        <span class="view-all">{{ thoughtsSection.viewAllText }}</span>
                    </div>
                    <div class="section-content">
                        <p class="section-desc">{{ thoughtsSection.description }}</p>
                        <div class="thought-list">
                            <!-- 文章列表 -->
                            <div class="thought-item" v-for="thought in thoughtsSection.thoughts" :key="thought.id"
                                @click="goToArticle(thought.id)">
                                <div class="thought-date" :data-date="thought.date">
                                    <span class="date-month">{{ formatDate(thought.date).month }}</span>
                                    <span class="date-day">{{ formatDate(thought.date).day }}</span>
                                    <span class="date-year">{{ formatDate(thought.date).year }}</span>
                                </div>
                                <div class="thought-content">
                                    <h3 class="thought-title">{{ thought.title }}</h3>
                                    <div class="thought-tags">
                                        <span class="tag" v-for="(tag, index) in thought.tags" :key="index">{{ tag
                                            }}</span>
                                    </div>
                                    <p class="thought-summary">{{ thought.summary }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>

        <!-- 游民时代 - 全宽度区域 -->
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

        <!-- 底部区域 -->
        <div class="bottom-sections">
            <!-- 互动交集 -->
            <section class="section interaction">
                <div class="section-header">
                    <h2>互动交集</h2>
                </div>
                <div class="section-content">
                    <div class="friends-links">
                        <h3>友情链接</h3>
                        <div class="links-grid">
                            <!-- 使用v-for循环渲染友链 -->
                            <a v-for="link in friendLinks" :key="link.id" :href="link.url" target="_blank"
                                class="friend-link">
                                <div class="link-icon">
                                    <img :src="link.logo" :alt="`${link.name} logo`" class="link-logo">
                                </div>
                                <div class="link-info">
                                    <span class="link-name">{{ link.name }}</span>
                                    <span class="link-desc">{{ link.description }}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="message-board">
                        <h3>留言板</h3>

                        <!-- 留言输入区域 -->
                        <div class="message-input-container">
                            <textarea v-model="messageInput" placeholder="写下你的留言..." class="message-input"></textarea>

                            <div class="message-actions">
                                <div class="privacy-toggle">
                                    <input type="checkbox" id="privacy-toggle" v-model="isPrivate">
                                    <label for="privacy-toggle">
                                        <span v-if="isPrivate">私密留言</span>
                                        <span v-else>公开留言</span>
                                    </label>
                                </div>

                                <button class="send-btn" @click="addMessage">发送</button>
                            </div>
                        </div>

                        <!-- 留言展示区域 -->
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
                        </div>

                        <!-- 查看更多按钮 -->
                        <button class="view-more-btn" @click="viewMoreMessages">查看更多留言</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeMount, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import Activity from '../components/Activity.vue'
import { currentTheme } from '../stores/themeStore'
import PhotoGallery from './PhotoGallery.vue';
// 导入需要的图标
import heartFilledIcon from '@/assets/icons/heart-filled.png';
import heartOutlineIcon from '@/assets/icons/heart.png';
import commentIcon from '@/assets/icons/comment.png';


const router = useRouter();

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
};

// 处理照片点赞
const handlePhotoLike = (photoId) => {
    const mediaIndex = lifeSection.value.mediaItems.findIndex(media => media.id === photoId);
    if (mediaIndex === -1) return;

    if (likedPhotoIds.value.includes(photoId)) {
        // 取消点赞
        likedPhotoIds.value = likedPhotoIds.value.filter(id => id !== photoId);
        lifeSection.value.mediaItems[mediaIndex].likes--;
    } else {
        // 添加点赞
        likedPhotoIds.value.push(photoId);
        lifeSection.value.mediaItems[mediaIndex].likes++;
    }
};

// 处理照片评论
const handlePhotoComment = ({ photoId, comment }) => {
    const mediaIndex = lifeSection.value.mediaItems.findIndex(media => media.id === photoId);
    if (mediaIndex === -1) return;

    lifeSection.value.mediaItems[mediaIndex].comments.unshift(comment);
};

// 检测当前设备窗口大小并设置isMobile状态
const checkScreenSize = () => {
    windowWidth.value = window.innerWidth;
    isMobile.value = windowWidth.value < 768;
};

// 在组件挂载前检测屏幕尺寸
onBeforeMount(() => {
    checkScreenSize();
});

// 在组件挂载后添加窗口大小变化事件监听
onMounted(() => {
    window.addEventListener('resize', checkScreenSize);

    // 读取sessionStorage中的主题设置
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
        currentTheme.value = savedTheme;
    }
});

// 在组件卸载时移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize);
});

// 个人介绍数据
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

// 学术札记数据
const academicSection = ref({
    title: '学术札记',
    description: '分享科研心得、学术观点与专业探索',
    viewAllText: '查看全部',
    articles: [
        {
            id: 1,
            title: '复杂网络与知识图谱',
            image: 'https://picsum.photos/400/250?random=1',
            summary: '探索知识图谱在复杂网络分析中的应用，及其在科研数据挖掘中的潜力...',
            tags: ['数据科学', '网络分析'],
            likes: 42,
            comments: 18
        },
        {
            id: 2,
            title: '深度学习模型优化策略',
            image: 'https://picsum.photos/400/250?random=2',
            summary: '分析当前主流深度学习模型的性能瓶颈，并提出创新优化方法...',
            tags: ['AI', '机器学习'],
            likes: 42,
            comments: 18
        },
        {
            id: 3,
            title: '数据可视化的认知基础',
            image: 'https://picsum.photos/400/250?random=3',
            summary: '从认知科学角度探讨有效数据可视化的设计原则与方法论...',
            tags: ['可视化', '认知科学'],
            likes: 42,
            comments: 18
        }
    ]
});


// 实践工坊数据
const workshopSection = ref({
    title: '实践工坊',
    description: '展示个人项目、工具开发与方法分享',
    viewAllText: '查看全部',
    projects: [
        {
            id: 1,
            title: '自动化数据分析平台',
            image: 'https://picsum.photos/500/300?random=4',
            summary: '基于Python的自动化数据分析工具，支持多种数据源和可视化输出...',
            tags: ['Python', '数据分析', '开源'],
            date: '2023-09',
            likes: 76,
            comments: 24
        },
        {
            id: 2,
            title: '知识库管理系统',
            image: 'https://picsum.photos/500/300?random=5',
            summary: '一款轻量级个人知识管理系统，支持笔记整理、标签管理和全文检索...',
            tags: ['Vue.js', 'Node.js', 'MongoDB'],
            date: '2023-06',
            likes: 76,
            comments: 24
        }
    ]
});
// 认知轨迹数据
const thoughtsSection = ref({
    title: '认知轨迹',
    description: '思考与观点的表达空间',
    viewAllText: '查看全部',
    thoughts: [
        {
            id: 1,
            title: '创造性思维的培养',
            date: '2023-11-15',
            tags: ['思维模式', '创新'],
            summary: '关于如何培养和激发创造性思维的个人思考与实践方法...'
        },
        {
            id: 2,
            title: '数字极简主义',
            date: '2023-11-15',
            tags: ['数字生活', '效率'],
            summary: '在信息过载时代如何实践数字极简主义，提升注意力质量...'
        },
        {
            id: 3,
            title: '专注与心流',
            date: '2023-11-15',
            tags: ['心理学', '生产力'],
            summary: '探讨进入心流状态的条件与方法，以及其对创造力的影响...'
        }
    ]
});
// 游民时代数据
const lifeSection = ref({
    title: '游民时代',
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
});

// 友情链接数据
const friendLinks = ref([
    {
        id: 1,
        name: 'Google',
        url: 'https://www.google.com',
        logo: 'https://img0.baidu.com/it/u=1949615176,3216656098&fm=253&fmt=auto&app=138&f=JPEG?w=357&h=365',
        description: '全球最大搜索引擎'
    },
    {
        id: 2,
        name: '百度',
        url: 'https://www.baidu.com',
        logo: 'https://www.baidu.com/favicon.ico',
        description: '中文搜索引擎'
    },
    {
        id: 3,
        name: 'Google Scholar',
        url: 'https://scholar.google.com',
        logo: 'https://img0.baidu.com/it/u=1217823906,428491688&fm=253&fmt=auto&app=138&f=JPEG?w=506&h=285',
        description: '学术文献搜索'
    },
    {
        id: 4,
        name: 'ResearchGate',
        url: 'https://www.researchgate.net',
        logo: 'https://img0.baidu.com/it/u=1030169371,2184594443&fm=253&fmt=auto&app=138&f=JPEG?w=231&h=231',
        description: '科研社交平台'
    },
    {
        id: 5,
        name: '中国知网',
        url: 'https://www.cnki.net',
        logo: 'https://pic.rmb.bdstatic.com/bjh/news/2253ad0f3fd8bfa719967c9fed00bb4d.jpeg',
        description: '学术资源平台'
    },
    {
        id: 6,
        name: 'arXiv',
        url: 'https://arxiv.org',
        logo: 'https://img1.baidu.com/it/u=3693130707,297865347&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        description: '开放学术预印本'
    }
]);


// 留言板数据
const messageInput = ref(''); // 用户输入的留言内容
const isPrivate = ref(false); // 是否是私密留言
const messages = ref([
    {
        id: 1,
        author: '张三',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        content: '博客内容非常精彩，期待更多更新！',
        date: '2025-04-05',
        isPrivate: false
    },
    {
        id: 2,
        author: '李四',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        content: '学术札记部分的观点很有启发性，已经收藏了。',
        date: '2025-04-04',
        isPrivate: false
    },
    {
        id: 3,
        author: '王五',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        content: '请问实践工坊中提到的知识库管理系统是否已开源？很感兴趣！',
        date: '2025-04-03',
        isPrivate: false
    },
    {
        id: 4,
        author: '赵六',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        content: '游民时代的照片拍得太美了，请问使用的是什么相机？',
        date: '2025-04-02',
        isPrivate: false
    },
    {
        id: 5,
        author: '钱七',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        content: '认知轨迹中关于数字极简主义的文章对我帮助很大，谢谢分享！',
        date: '2025-04-01',
        isPrivate: false
    }
]);

// 添加跳转函数
const goToArticle = (articleId) => {
    router.push({
        name: 'Article',
        query: { id: articleId }
    });
};

// 计算属性：只显示最新的5条公开留言
const displayMessages = computed(() => {
    return messages.value
        .filter(message => !message.isPrivate)
        .slice(0, 5);
});

// 添加留言方法
const addMessage = () => {
    if (!messageInput.value.trim()) return;

    // 创建新留言
    const newMessage = {
        id: Date.now(), // 使用时间戳作为唯一ID
        author: '访客用户', // 实际应用中可能需要登录系统
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        content: messageInput.value,
        date: new Date().toISOString().split('T')[0],
        isPrivate: isPrivate.value
    };

    // 添加到留言列表最前面
    messages.value.unshift(newMessage);

    // 清空输入框
    messageInput.value = '';
};

// 查看更多留言
const viewMoreMessages = () => {
    // console.log('查看更多留言被点击');
    // 这里可以添加导航到留言详情页面的逻辑
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
// 关于我按钮点击处理
const handleAboutClick = () => {
    // console.log('关于我按钮被点击');
    // 这里可以添加导航到关于页面或显示关于信息弹窗的逻辑
};

</script>

<style scoped>
/* 主题变量定义 */
.dark {
    --bg-primary: rgba(25, 25, 35, 0.55);
    --bg-secondary: rgba(30, 30, 40, 0.7);
    --bg-tertiary: rgba(40, 40, 55, 0.4);
    --text-primary: white;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.2);
    --gradient-text: linear-gradient(45deg, #ffffff, #b8c6db);
    --hover-bg: rgba(255, 255, 255, 0.1);
    --card-bg: rgba(30, 30, 40, 0.7);
    --input-bg: rgba(255, 255, 255, 0.05);
}

.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-primary: #333;
    --text-secondary: #555;
    --border-color: rgba(0, 0, 0, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.1);
    --gradient-text: linear-gradient(45deg, #333, #666);
    --hover-bg: rgba(0, 0, 0, 0.05);
    --card-bg: rgba(255, 255, 255, 0.85);
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
    border: none;
    border-radius: 16px;
    margin-bottom: 30px;
    padding: 24px;
    position: relative;
    backdrop-filter: blur(10px);
    background-color: var(--bg-primary);
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px var(--shadow-color),
        0 2px 8px rgba(0, 0, 0, 0.15),
        0 0 1px var(--border-color);
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
}

.side-column {
    flex: 2;
}

/* 学术札记 */
.article-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.article-card-placeholder {
    height: 120px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 实践工坊 */
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

/* 认知轨迹 */
.thought-item-placeholder {
    height: 60px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 最近更新 */
.update-item-placeholder {
    height: 50px;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px dashed rgba(255, 255, 255, 0.2);
}

/* 游民时代 */
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
    align-items: center;
    background-color: var(--card-bg);
    border-radius: 10px;
    padding: 10px;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px var(--shadow-color);
    height: 60px;
}

.friend-link:hover {
    transform: translateY(-4px);
    background-color: rgba(50, 50, 70, 0.85);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.link-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin-right: 10px;
    overflow: hidden;
}

.link-logo {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
}

.link-info {
    display: flex;
    flex-direction: column;
}

.link-name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 3px;
}

.link-desc {
    font-size: 11px;
    opacity: 0.7;
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

/* 学术札记卡片样式 */
.article-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--card-bg);
    box-shadow: 0 8px 20px var(--shadow-color);
    transition: all 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    /* 添加鼠标指针样式 */
}

.article-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px var(--shadow-color);
}

.article-image {
    height: 140px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.article-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to top, var(--card-bg), transparent);
}

.article-content {
    padding: 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.article-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.3px;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
}

.article-summary {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.8;
    flex: 1;
    color: var(--text-secondary);
}

/* 实践工坊卡片样式 */
.project-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--card-bg);
    box-shadow: 0 8px 20px var(--shadow-color);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 25px var(--shadow-color);
}

.project-image {
    height: 160px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.project-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: linear-gradient(to top, var(--card-bg), transparent);
}

.project-content {
    padding: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.project-title {
    margin: 0 0 10px 0;
    font-size: 20px;
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

/* 认知轨迹卡片样式 */
.thought-item {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: 0 4px 15px var(--shadow-color);
    transition: all 0.3s ease;
    display: flex;
    gap: 15px;
    cursor: pointer;
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

/* 游民时代卡片样式 */
.media-item {
    position: relative;
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

/* 游民时代调整 */
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
    color: rgba(255, 255, 255, 0.8);
}

.privacy-toggle input[type="checkbox"] {
    appearance: none;
    width: 40px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
}

.privacy-toggle input[type="checkbox"]:checked {
    background-color: rgba(154, 96, 180, 0.5);
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
    color: rgba(255, 255, 255, 0.6);
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
    .article-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .media-gallery {
        grid-template-columns: repeat(3, 1fr);
    }

    .links-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 992px) {
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

    .article-grid {
        grid-template-columns: repeat(2, 1fr);
    }

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

    /* 移动端游民时代卡片默认显示摘要和点赞信息 */
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