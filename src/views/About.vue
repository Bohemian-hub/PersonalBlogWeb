<template>
    <TopBar />
    <!-- 添加主题切换按钮 -->
    <ThemeToggler class="about-theme-toggler" />

    <div class="about-wrapper" :class="currentTheme">
        <div class="about-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader :title="pageHeader.title" :description="pageHeader.description" :icon="pageHeader.icon" />

            <!-- 简介和信息展示区 -->
            <section class="profile-section">
                <div class="profile-header">
                    <div class="profile-image-container">
                        <div class="profile-image">
                            <img :src="profile.avatar" alt="个人照片"
                                onerror="this.src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                        </div>
                        <div class="profile-decorations">
                            <div class="decoration-item" v-for="i in 5" :key="i"></div>
                        </div>
                    </div>

                    <div class="profile-intro">
                        <h2>{{ profile.greeting }}<span class="highlight-text">{{ profile.name }}</span></h2>
                        <p class="intro-text">
                            {{ profile.introduction }}
                        </p>

                        <div class="basic-info">
                            <div class="info-row">
                                <div class="info-item" v-for="(info, index) in profile.basicInfo.slice(0, 2)"
                                    :key="index">
                                    <el-icon>
                                        <component :is="info.icon" />
                                    </el-icon>
                                    <span>{{ info.value }}</span>
                                </div>
                            </div>
                            <div class="info-row">
                                <div class="info-item" v-for="(info, index) in profile.basicInfo.slice(2)"
                                    :key="index + 2">
                                    <el-icon>
                                        <component :is="info.icon" />
                                    </el-icon>
                                    <span>{{ info.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 教育和研究 -->
                <div class="education-research">
                    <div class="section-block education">
                        <h3 class="block-title"><el-icon>
                                <School />
                            </el-icon> {{ sectionTitles.education }}</h3>
                        <div class="timeline">
                            <div class="timeline-item" v-for="(edu, index) in education" :key="index">
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <h4>{{ edu.school }}</h4>
                                    <p class="timeline-meta">{{ edu.major }} · {{ edu.degree }}</p>
                                    <p class="timeline-period">{{ edu.period }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-block research">
                        <h3 class="block-title"><el-icon>
                                <Connection />
                            </el-icon> {{ sectionTitles.research }}</h3>
                        <div class="research-tags">
                            <div class="research-tag" v-for="(research, index) in researchAreas" :key="index">
                                {{ research }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 技术栈和兴趣 -->
                <div class="tech-interests">
                    <div class="section-block tech">
                        <h3 class="block-title">
                            <el-icon>
                                <DataAnalysis />
                            </el-icon>
                            {{ sectionTitles.tech }}
                        </h3>
                        <div class="skill-categories">
                            <div class="skill-category" v-for="(category, idx) in techStack" :key="idx">
                                <h4 class="category-name">{{ category.name }}</h4>
                                <div class="skill-tags">
                                    <el-tag v-for="(skill, i) in category.skills" :key="i" :type="getTagType(i)"
                                        class="skill-tag" effect="light">
                                        {{ skill }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section-block interests">
                        <h3 class="block-title">
                            <el-icon>
                                <Star />
                            </el-icon>
                            {{ sectionTitles.interests }}
                        </h3>
                        <div class="interests-grid">
                            <div class="interest-item" v-for="(interest, index) in interests" :key="index">
                                <div class="interest-icon">
                                    <img :src="interest.iconImage" :alt="interest.title">
                                </div>
                                <div class="interest-content">
                                    <h4>{{ interest.title }}</h4>
                                    <p>{{ interest.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 个人照片墙 - 调整位置到中间 -->
                <h3 class="section-title">
                    <el-icon>
                        <Picture />
                    </el-icon>
                    个人照片墙
                </h3>

                <!-- 照片瀑布流布局 -->
                <div class="masonry-grid">
                    <div v-for="(photo, index) in personalPhotos" :key="photo.id" class="masonry-item"
                        :class="getMasonryClass(index)" @click="showPhotoDetails(index)">
                        <div class="photo-inner">
                            <img :src="photo.images[0].url" :alt="photo.title" />
                            <div class="photo-count" v-if="photo.images.length > 1">
                                {{ photo.images.length }}
                            </div>
                            <div class="photo-overlay">
                                <h4>{{ photo.title }}</h4>
                                <!-- 修改标签区域的类名为tags与Play页面保持一致 -->
                                <div class="tags">
                                    <el-tag size="small" v-for="tag in photo.tags" :key="tag" class="tag-item">
                                        {{ tag }}
                                    </el-tag>
                                </div>
                                <!-- 修改为只显示位置，与Play页面保持一致 -->
                                <p>{{ photo.location }}</p>
                                <!-- 添加照片点赞和评论数量显示 -->
                                <div class="photo-stats">
                                    <div class="stat-item">
                                        <img :src="heartIcon" alt="likes" class="stat-icon" />
                                        <span>{{ photo.likes }}</span>
                                    </div>
                                    <div class="stat-item">
                                        <img :src="commentIcon" alt="comments" class="stat-icon" />
                                        <span>{{ photo.comments.length }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 座右铭和联系方式 -->
                <div class="motto-contact">
                    <div class="motto">
                        <blockquote>
                            {{ motto.text }}
                            <cite>{{ motto.cite }}</cite>
                        </blockquote>
                    </div>

                    <div class="contact-links">
                        <a v-for="(contact, index) in contacts" :key="index" :href="contact.link" class="contact-link">
                            <el-icon>
                                <component :is="contact.icon" />
                            </el-icon>
                            <span class="contact-tooltip">{{ contact.title }}</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    </div>

    <!-- 底部版权 - 移到about-wrapper外部，与Play页面保持一致 -->
    <Footer />
    
    <!-- 替换原来的照片详情弹窗为PhotoGallery组件 -->
    <PhotoGallery v-model:visible="showPhotoDialog" :photos="personalPhotos" :initialPhotoIndex="currentPhotoIndex"
        :heartFilledIcon="heartIcon" :heartOutlineIcon="heartOutlineIcon" :commentIcon="commentIcon"
        :likedPhotoIds="likedPhotos" @like="handlePhotoLike" @comment="handlePhotoComment" />

    <!-- 背景图片 - 秮到与Play页面相同位置 -->
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import {
    Calendar, Location, Star, User, School, Connection,
    Message, ElementPlus, ChatDotRound, DataAnalysis,
    Headset, Film, Suitcase, Reading, Brush, Picture,
    ArrowLeft, ArrowRight
} from '@element-plus/icons-vue'
import PhotoGallery from '../components/PhotoGallery.vue'
import { ElMessage } from 'element-plus'

// 引入点赞和评论图标
import heartFilledIcon from '@/assets/icons/heart-filled.png'
import commentIconFile from '@/assets/icons/comment.png'
import heartOutlineIcon from '@/assets/icons/heart.png'

// 图标引用
const heartIcon = heartFilledIcon
const commentIcon = commentIconFile

// 恢复使用原始背景图片
import bgFile from '@/assets/images/bg7.png'
const bgUrl = bgFile

// 页面头部信息
const pageHeader = reactive({
    title: "关于我",
    description: "人工智能研究者 / 全栈开发工程师 / 未来教育者",
    icon: "✨"
})

// 个人资料信息
const profile = reactive({
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    greeting: "嗨，我是",
    name: "何东",
    introduction: "一位充满热情的技术爱好者和教育者，专注于人工智能、全栈开发与知识传递。现年25岁，即将成为一名大学教师，期待在教学与研究中探索更多可能性。",
    basicInfo: [
        { icon: 'Calendar', value: '2000年5月20日' },
        { icon: 'Location', value: '四川绵阳' },
        { icon: 'Star', value: '金牛座' },
        { icon: 'User', value: '180cm / 76kg' }
    ]
})

// 区段标题
const sectionTitles = reactive({
    education: "教育背景",
    research: "研究方向",
    tech: "技术栈",
    interests: "兴趣爱好"
})

// 教育背景
const education = reactive([
    {
        school: "昆明理工大学",
        major: "人工智能专业",
        degree: "硕士",
        period: "2022 - 2025"
    },
    {
        school: "本科院校",
        major: "计算机科学与技术专业",
        degree: "学士",
        period: "2018 - 2022"
    }
])

// 研究方向
const researchAreas = reactive([
    '生物医学工程',
    '自然语言处理',
    '信息抽取',
    '知识图谱',
    '大模型应用'
])

// 技术栈
const techStack = reactive([
    {
        name: '前端开发',
        skills: ['Vue.js', 'HTML5/CSS3', 'JavaScript', 'TypeScript', '微信小程序']
    },
    {
        name: '后端开发',
        skills: ['Python', 'Flask', 'Django', 'Java', 'SpringBoot', 'RESTful API']
    },
    {
        name: '数据库',
        skills: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL']
    },
    {
        name: '人工智能',
        skills: ['PyTorch', 'TensorFlow', 'NLP', '大型语言模型', '知识图谱']
    }
])

// 兴趣爱好
const interests = reactive([
    {
        iconImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        title: '旅游探索',
        description: '喜欢探索不同的城市和自然风光，体验多元文化，收集各地的独特记忆。',
    },
    {
        iconImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        title: '软硬件开发',
        description: '业余时间喜欢动手做一些创意硬件项目，结合软件开发创造实用工具。',
    },
    {
        iconImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        title: '音乐欣赏',
        description: '热爱民谣音乐，尤其喜欢回春丹、福绿寿等歌手的作品，享受音乐带来的情感共鸣。',
    },
    {
        iconImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        title: '影视作品',
        description: '科幻电影和古装玄幻剧是闲暇时最爱的放松方式，享受想象力与视觉盛宴。',
    }
])

// 座右铭
const motto = reactive({
    text: "技术改变世界，教育塑造未来。保持好奇，持续学习，让知识照亮前行的道路。",
    cite: "- 人生观：随缘而行，不忘初心"
})

// 联系方式
const contacts = reactive([
    { icon: Message, title: '电子邮箱', link: '#' },
    { icon: ElementPlus, title: 'GitHub', link: '#' },
    { icon: ChatDotRound, title: '微信', link: '#' },
    { icon: Connection, title: 'LinkedIn', link: '#' }
])

// 个人照片墙数据 - 修改结构以支持多图浏览，并添加likes和comments字段
const personalPhotos = ref([
    {
        id: 1,
        title: '研究生入学季',
        location: '昆明理工大学',
        date: '2022年9月',
        description: '<h1>硕士研究生入学</h1><p>入学的第一天，开始了新的学术旅程。校园环境优美，充满学术氛围。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '校园主楼'
            },
            {
                url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '图书馆内景'
            },
            {
                url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '研究生开学典礼'
            }
        ],
        tags: ['校园', '学术', '新起点'],
        likes: 78,
        comments: [
            {
                author: '同学小王',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                text: '恭喜入学！我也是昆工的学生，有空可以一起交流',
                time: '2天前'
            }
        ]
    },
    {
        id: 2,
        title: '工作出差',
        location: '上海人工智能大会',
        date: '2023年4月',
        description: '<h1>上海人工智能大会</h1><p>代表公司参加上海人工智能大会，了解行业最新动态，与各大企业技术专家进行交流。期间拜访了多家AI企业，为后续合作奠定基础。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '技术交流会'
            },
            {
                url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '企业参观'
            },
            {
                url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '上海夜景'
            }
        ],
        tags: ['出差', '会议', '人工智能'],
        likes: 56,
        comments: [
            {
                author: 'AI研究员',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                text: '这次大会干货满满，我也参加了，可惜没有遇到你',
                time: '1周前'
            },
            {
                author: '技术总监',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                text: '会上的张教授演讲确实很精彩，学到很多',
                time: '3周前'
            }
        ]
    },
    {
        id: 3,
        title: '第一篇论文发表',
        location: '办公室',
        date: '2023年7月',
        description: '<h1>SCI论文接收</h1><p>第一篇SCI论文被接收的喜悦时刻，经过数月的努力终于有了成果。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '论文成稿'
            },
            {
                url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '收到录用通知'
            }
        ],
        tags: ['论文', '科研', '成就'],
        likes: 124,
        comments: [
            {
                author: '导师',
                avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                text: '恭喜你！这是一个很好的开始，继续努力！',
                time: '5天前'
            }
        ]
    },
    {
        id: 4,
        title: '技术沙龙',
        location: '创新中心',
        date: '2023年10月',
        description: '<h1>技术沙龙分享</h1><p>参加校内技术沙龙，分享最新的AI技术发展趋势，与其他研究者交流学习。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '演讲现场'
            }
        ],
        tags: ['分享', '交流', '技术'],
        likes: 45,
        comments: []
    },
    {
        id: 5,
        title: '周末徒步',
        location: '云南石林',
        date: '2023年11月',
        description: '<h1>石林徒步</h1><p>与实验室同学一起去石林徒步，呼吸新鲜空气，放松身心。大自然的鬼斧神工令人惊叹。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '石林全景'
            },
            {
                url: 'https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '徒步小队'
            },
            {
                url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '奇特石景'
            }
        ],
        tags: ['户外', '放松', '自然'],
        likes: 89,
        comments: [
            {
                author: '同学小李',
                avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
                text: '下次去记得叫上我啊，这里风景真美！',
                time: '3天前'
            },
            {
                author: '摄影爱好者',
                avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
                text: '构图不错，石林的景色拍出来很有层次感',
                time: '1周前'
            }
        ]
    },
    {
        id: 6,
        title: '项目演示日',
        location: '科技园',
        date: '2024年1月',
        description: '<h1>项目成果展示</h1><p>向学院领导和企业代表展示我们的智能医疗辅助诊断系统，获得了积极反馈。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '项目展示'
            },
            {
                url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '系统演示'
            }
        ],
        tags: ['项目', '演示', '成果'],
        likes: 67,
        comments: [
            {
                author: '医学专家',
                avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                text: '这个系统很有潜力，希望能尽快应用到临床实践中',
                time: '2周前'
            }
        ]
    },
    {
        id: 7,
        title: '学术会议',
        location: '北京国际会议中心',
        date: '2024年3月',
        description: '<h1>全国人工智能学术会议</h1><p>参加全国人工智能学术会议，与领域内专家学者交流，开拓视野。</p>',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '会议现场'
            },
            {
                url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '专家报告'
            },
            {
                url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '与同行交流'
            }
        ],
        tags: ['会议', '学术', '交流'],
        likes: 35,
        comments: []
    }
])

// 标签颜色辅助函数
const getTagType = (index) => {
    const types = ['', 'success', 'warning', 'danger', 'info'];
    return types[index % types.length];
}

// 照片墙布局类名分配函数
const getMasonryClass = (index) => {
    const pattern = index % 8;
    switch (pattern) {
        case 0: return 'wide';
        case 3: return 'tall';
        case 5: return 'big';
        default: return '';
    }
}

// 照片详情弹窗控制
const showPhotoDialog = ref(false)
const currentPhotoIndex = ref(0)
const likedPhotos = ref([]) // 存储已点赞的照片ID

// 显示照片详情
const showPhotoDetails = (index) => {
    currentPhotoIndex.value = index
    showPhotoDialog.value = true
}

// 处理照片点赞
const handlePhotoLike = (photoId) => {
    const photoIndex = personalPhotos.value.findIndex(photo => photo.id === photoId);
    if (photoIndex === -1) return;

    if (likedPhotos.value.includes(photoId)) {
        // 取消点赞
        likedPhotos.value = likedPhotos.value.filter(id => id !== photoId);
        personalPhotos.value[photoIndex].likes--;
    } else {
        // 添加点赞
        likedPhotos.value.push(photoId);
        personalPhotos.value[photoIndex].likes++;
    }
}

// 处理照片评论
const handlePhotoComment = ({ photoId, comment }) => {
    const photoIndex = personalPhotos.value.findIndex(photo => photo.id === photoId);
    if (photoIndex === -1) return;

    personalPhotos.value[photoIndex].comments.unshift(comment);
    ElMessage.success('评论成功！');
}
</script>

<style scoped>
/* 主题变量定义 */
.about-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.75);
    --bg-secondary: rgba(30, 30, 40, 0.8);
    --bg-tertiary: rgba(40, 40, 55, 0.7);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.2);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --quote-bg: rgba(30, 30, 40, 0.8);
    --profile-decoration: rgba(255, 255, 255, 0.1);
    --social-bg: rgba(255, 255, 255, 0.1);
    --social-hover: rgba(255, 255, 255, 0.2);
    --highlight: #61dafb;
    --research-tag-bg: rgba(74, 144, 226, 0.2);
    --research-tag-color: #ffffff;
}

.about-wrapper.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.1);
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-bg-hover: rgba(255, 255, 255, 0.95);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --quote-bg: rgba(248, 248, 252, 0.9);
    --profile-decoration: rgba(0, 0, 0, 0.05);
    --social-bg: rgba(0, 0, 0, 0.05);
    --social-hover: rgba(0, 0, 0, 0.1);
    --highlight: #3a7bd5;
    --research-tag-bg: rgba(74, 144, 226, 0.1);
    --research-tag-color: #333333;
}

.bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: -2;
}

.bg-image.dim-bg {
    filter: brightness(0.9) saturate(0.8);
    /* 只调整亮度和饱和度，不添加模糊 */
}

.about-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

/* 全局布局 - 调整与 Play 页面一致 */
.about-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px; /* 调整为与Play页面一致的100px */
    position: relative;
}

.about-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.about-content {
    padding: 80px 40px 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    color: var(--text-color);
}

/* 背景图片样式 */
.bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: -2;
}

.bg-image.dim-bg {
    filter: brightness(0.9) saturate(0.8);
}

/* 页面标题 - 调整与 Play 页面一致 */
.page-header {
    text-align: center;
    margin-bottom: 40px;
    /* 调整与Play页面一致 */
    position: relative;
}

.page-title {
    font-size: 40px;
    /* 调整与Play页面一致 */
    margin-bottom: 16px;
    /* 调整与Play页面一致 */
    font-weight: 600;
    /* 调整与Play页面一致 */
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
    animation: fadeIn 1s ease-out;
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 30px;
    /* 调整与Play页面一致 */
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

.divider-icon {
    font-size: 22px;
}

/* 个人简介区 */
.profile-section {
    background-color: var(--bg-primary);
    border-radius: 16px;
    padding: 25px;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease-out;
    margin-bottom: 30px;
    /* 添加底部间距，使各部分有所区分 */
}

.profile-header {
    display: flex;
    gap: 20px;
    /* 减少间距 */
    margin-bottom: 25px;
    /* 减少底部margin */
    align-items: center;
}

.profile-image-container {
    position: relative;
    flex-shrink: 0;
}

.profile-image {
    width: 160px;
    /* 稍微减小图片尺寸 */
    height: 160px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border: 4px solid var(--card-bg);
    transform: rotate(-3deg);
    transition: all 0.3s ease;
    z-index: 2;
}

.profile-image:hover {
    transform: rotate(0deg);
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.decoration-item {
    position: absolute;
    background-color: var(--profile-decoration);
    border-radius: 50%;
}

.decoration-item:nth-child(1) {
    width: 40px;
    height: 40px;
    top: -10px;
    right: -10px;
    background: linear-gradient(45deg, var(--accent-color), transparent);
    opacity: 0.2;
}

.decoration-item:nth-child(2) {
    width: 30px;
    height: 30px;
    bottom: -5px;
    left: -15px;
    background: linear-gradient(45deg, var(--accent-secondary), transparent);
    opacity: 0.15;
}

.profile-intro {
    flex: 1;
}

.profile-intro h2 {
    font-size: 28px;
    margin-bottom: 15px;
    font-weight: 600;
    color: var(--heading-color);
}

.highlight-text {
    color: var(--highlight);
    position: relative;
    padding: 0 5px;
}

.highlight-text::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: var(--highlight);
    opacity: 0.2;
    z-index: -1;
    border-radius: 4px;
}

.intro-text {
    font-size: 15px;
    /* 稍微减小字体 */
    line-height: 1.6;
    /* 减小行高 */
    margin-bottom: 15px;
    /* 减少底部margin */
    color: var(--text-secondary);
}

.basic-info {
    display: flex;
    flex-direction: row;
    /* 改为水平排列 */
    gap: 20px;
    /* 调整间距 */
    flex-wrap: wrap;
    /* 允许换行 */
}

.info-row {
    display: flex;
    gap: 20px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: var(--text-secondary);
}

.info-item .el-icon {
    color: var(--accent-color);
}

/* 教育和研究区域 */
.education-research {
    display: flex;
    gap: 20px;
    /* 减少间距 */
    margin-bottom: 25px;
    /* 减少底部margin */
}

.section-block {
    background-color: var(--bg-secondary);
    border-radius: 12px;
    padding: 18px;
    /* 减少内边距 */
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease;
}

.section-block:hover {
    transform: translateY(-3px);
}

.education {
    flex: 1;
}

.research {
    flex: 1;
}

.block-title {
    font-size: 17px;
    /* 稍微减小字体 */
    margin-bottom: 12px;
    /* 减少底部margin */
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--card-border);
    color: var(--heading-color);
}

.block-title .el-icon {
    color: var(--accent-color);
}

/* 时间线样式 */
.timeline {
    position: relative;
    padding-left: 20px;
}

.timeline::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 6px;
    width: 2px;
    background-color: var(--timeline-line);
}

.timeline-item {
    position: relative;
    padding-bottom: 12px;
    /* 减少底部padding */
    margin-bottom: 8px;
    /* 减少底部margin */
}

.timeline-item:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
}

.timeline-dot {
    position: absolute;
    left: -20px;
    top: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--timeline-dot);
}

.timeline-content {
    padding-left: 5px;
}

.timeline-content h4 {
    margin: 0 0 3px 0;
    /* 减少底部margin */
    font-size: 16px;
    font-weight: 600;
    color: var(--heading-color);
}

.timeline-meta {
    font-size: 14px;
    color: var(--accent-color);
    margin: 0 0 3px 0;
}

.timeline-period {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
}

/* 研究方向标签 */
.research-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.research-tag {
    background-color: var(--research-tag-bg);
    color: var(--research-tag-color);
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.research-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 技术栈和兴趣 */
.tech-interests {
    display: flex;
    gap: 20px;
    /* 减少间距 */
    margin-bottom: 25px;
    /* 减少底部margin */
}

.tech {
    flex: 1;
}

.interests {
    flex: 1;
}

.skill-categories {
    display: flex;
    flex-direction: column;
    gap: 12px;
    /* 减少间距 */
}

.category-name {
    font-size: 15px;
    /* 稍微减小字体 */
    margin: 0 0 5px 0;
    /* 减少底部margin */
    color: var(--heading-color);
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.skill-tag {
    margin-right: 0;
    margin-bottom: 4px;
}

/* 兴趣爱好 */
.interests-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.interest-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
}

.interest-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    /* 确保图片不会溢出圆形边界 */
}

.interest-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.interest-content {
    flex: 1;
}

.interest-content h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: var(--heading-color);
}

.interest-content p {
    margin: 0;
    font-size: 13px;
    line-height: 1.4;
    color: var(--text-secondary);
}

/* 座右铭和联系方式 */
.motto-contact {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    /* 修改为居中对齐，更好地与联系图标对齐 */
    justify-content: space-between;
}

.motto {
    width: 75%;
    padding: 0;
}

blockquote {
    background-color: var(--quote-bg);
    border-left: 4px solid var(--accent-color);
    padding: 12px 18px;
    margin: 0;
    border-radius: 8px;
    font-style: italic;
    font-size: 15px;
    line-height: 1.5;
    color: var(--text-color);
    position: relative;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

blockquote cite {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: var(--text-secondary);
    text-align: right;
    font-style: normal;
}

.contact-links {
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: 0;
    flex-wrap: wrap;
}

.contact-link {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--social-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 18px;
    position: relative;
    /* 为tooltip定位做准备 */
}

.contact-link:hover {
    background-color: var(--social-hover);
    transform: translateY(-3px);
    color: var(--highlight);
}

/* 新增: 联系方式悬浮提示效果 */
.contact-tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--card-bg);
    color: var(--text-color);
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    /* 防止tooltip影响鼠标事件 */
    border: 1px solid var(--card-border);
    z-index: 10;
}

.contact-tooltip::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent var(--card-bg) transparent;
}

.contact-link:hover .contact-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
    animation: tooltipPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 照片墙部分样式 - 完善与Play页面一致的样式 */
.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 30px;
    color: var(--heading-color);
    font-weight: 600;
}

.section-title .el-icon {
    color: var(--accent-color);
}

/* 瀑布流照片墙样式 - 补充完整样式 */
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
    gap: 12px;
    margin-bottom: 25px;
}

.masonry-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: var(--card-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    grid-column: span 1;
    grid-row: span 1;
}

.masonry-item.wide {
    grid-column: span 2;
}

.masonry-item.tall {
    grid-row: span 2;
}

.masonry-item.big {
    grid-column: span 2;
    grid-row: span 2;
}

.masonry-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.photo-inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.photo-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.masonry-item:hover .photo-inner img {
    transform: scale(1.05);
}

/* 照片覆盖层样式 - 确保与Play页面一致 */
.photo-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.about-wrapper.light .photo-overlay {
    background: rgba(0, 0, 0, 0.6);
    color: white;
}

.masonry-item:hover .photo-overlay {
    transform: translateY(0);
}

.photo-overlay h4 {
    margin: 0 0 5px;
    font-size: 16px;
}

.photo-overlay p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
}

/* 修改标签样式，与Play页面保持一致 */
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.tag-item {
    background: var(--tag-bg);
    color: var(--tag-text);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    margin-right: 5px;
}

/* 照片统计样式 */
.photo-stats {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.stat-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 12px;
}

.stat-icon {
    width: 16px !important;
    height: 16px !important;
    margin-right: 4px;
}

/* 修复响应式样式 */
@media (max-width: 768px) {
    .about-content {
        padding: 60px 20px 20px;
    }

    .page-title {
        font-size: 32px;
    }

    .profile-header {
        flex-direction: column;
    }

    .profile-image {
        margin: 0 auto;
    }

    .profile-intro {
        text-align: center;
    }

    .basic-info {
        justify-content: center;
        flex-direction: column;
    }

    .education-research,
    .tech-interests {
        flex-direction: column;
    }

    .info-row {
        justify-content: center;
    }

    .motto-contact {
        flex-direction: column;
        align-items: flex-start;
    }

    .motto {
        width: 100%;
        margin-bottom: 15px;
    }

    .contact-links {
        width: 100%;
        justify-content: flex-start;
    }

    /* 照片墙移动端适配 - 单列布局 */
    .masonry-grid {
        grid-template-columns: repeat(1, 1fr);
        grid-auto-rows: auto;
    }
    
    /* 移动端特别样式 - 重置所有网格项为单列 */
    .masonry-item {
        grid-column: span 1 !important;
        grid-row: span 1 !important;
        height: 250px;
        margin-bottom: 20px;
    }
    
    /* 移动端直接显示照片信息，不需要悬浮 */
    .photo-overlay {
        transform: translateY(0);
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 120px);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    
    /* 调整标签在移动端的显示，与Play页面保持一致 */
    .tags {
        max-width: 100%;
        overflow-x: auto;
        padding-bottom: 5px;
        flex-wrap: nowrap;
        scrollbar-width: none; /* Firefox */
    }
    
    .tags::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
    }
    
    /* 移动端照片统计显示优化 */
    .photo-stats {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 20px;
        padding: 3px 8px;
    }
}

@media (max-width: 600px) {
    .about-content {
        padding: 60px 20px 30px;
    }

    .page-title {
        font-size: 32px;
    }

    .profile-section {
        padding: 20px;
    }

    .section-block {
        padding: 15px;
    }

    .info-row {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    /* 联系方式tooltip在小屏幕上的调整 */
    .contact-tooltip {
        font-size: 11px;
        padding: 4px 8px;
    }

    .masonry-grid {
        grid-template-columns: 1fr;
    }
    
    .masonry-item {
        height: 220px;
    }
    
    /* 标题字体缩小 */
    .photo-overlay h4 {
        font-size: 18px;
    }
    
    /* 照片计数移到左上角 */
    .photo-count {
        left: 10px;
        right: auto;
    }
}
</style>