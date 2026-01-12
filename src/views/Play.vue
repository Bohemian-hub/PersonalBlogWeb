<template>
    <TopBar />
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 使用封装的页面标题组件 -->
            <PageHeader title="朋友圈（开发中）" description="记录生活点滴，分享旅行见闻与个人兴趣爱好" icon="🌈" />

            <!-- 照片墙 - 瀑布流照片墙 -->
            <section class="section-container photo-gallery">
                <h2 class="section-title">
                    <el-icon>
                        <Picture />
                    </el-icon>
                    照片墙
                </h2>

                <!-- 照片瀑布流布局 -->
                <div class="masonry-grid">
                    <div v-for="(photoGroup, index) in photos" :key="photoGroup.id" class="masonry-item"
                        :class="getMasonryClass(index)" @click="showPhotoGallery(index)">
                        <div class="photo-inner">
                            <img :src="photoGroup.images[0].url" :alt="photoGroup.title" />
                            <div class="photo-date">
                                {{ photoGroup.date }}
                            </div>
                            <div class="photo-count" v-if="photoGroup.images.length > 1">
                                {{ photoGroup.images.length }}
                            </div>
                            <div class="photo-overlay">
                                <h4>{{ photoGroup.title }}</h4>
                                <!-- //循环显示一下tags -->
                                <div class="tags"> <!-- 标签之间的间隙 -->
                                    <el-tag size="small" v-for="tag in photoGroup.tags" :key="tag" class="tag-item">
                                        {{ tag }}
                                    </el-tag>
                                </div>
                                <p>{{ photoGroup.location }}</p>
                                <!-- 将照片统计信息移到这里 -->
                                <div class="photo-stats">
                                    <div class="stat-item">
                                        <img :src="heartIcon" alt="likes" class="stat-icon" />
                                        <span>{{ photoGroup.likes }}</span>
                                    </div>
                                    <div class="stat-item">
                                        <img :src="commentIcon" alt="comments" class="stat-icon" />
                                        <span>{{ photoGroup.comments.length }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 将原来的照片画廊弹窗代码替换为: -->
                <PhotoGallery v-model:visible="showPhotoDialog" :photos="photos" :initialPhotoIndex="currentPhotoIndex"
                    :heartFilledIcon="heartIcon" :heartOutlineIcon="heartOutlineIcon" :commentIcon="commentIcon"
                    :likedPhotoIds="likedPhotos" @like="handlePhotoLike" @comment="handlePhotoComment" />
            </section>


        </div>
    </div>
    <Footer />
    <div class="global-bg"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
    Picture
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import PageHeader from '../components/PageHeader.vue'
import { currentTheme } from '../stores/themeStore'
import { ElMessage } from 'element-plus'
import PhotoGallery from '../components/PhotoGallery.vue';

// 引入点赞和评论图标
import heartFilledIcon from '@/assets/icons/heart-filled.png'
import commentIconFile from '@/assets/icons/comment.png'
import heartOutlineIcon from '@/assets/icons/heart.png' // 假设有一个空心心形图标

// 图标引用
const heartIcon = heartFilledIcon
const commentIcon = commentIconFile

// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)

// 处理滚动事件的函数
const handleScroll = () => {
    showTopBar.value = window.scrollY <= 400
}

// 组件挂载时添加滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
})

// 组件卸载时移除事件监听
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

// 照片墙数据 - 添加点赞和评论
const photos = ref([
    {
        id: 0,
        title: '城市夜景',
        location: '纽约市',
        date: '2025年6月10日',
        description: '<h1>纽约的璀璨夜空</h1><p>站在高楼之上，俯瞰这座不夜城，灯火辉煌，车水马龙，仿佛置身于星河之中。</p><h2>拍摄心得</h2><p>使用长曝光技术捕捉了城市的动感与活力。</p>',
        tags: ['城市', '夜景', '旅行'],
        likes: 204,
        comments: [
            {
                author: '摄影爱好者小张',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                text: '这张照片拍得太棒了！纽约的夜景果然名不虚传',
                time: '3小时前'
            }
        ],
        images: [
            {
                url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '纽约夜景全景'
            },
            {
                url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '时代广场灯光'
            },
            {
                url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '布鲁克林大桥夜景'
            }
        ]
    },
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
    },
    {
        id: 5,
        title: '精致晚餐',
        location: '东京米其林餐厅',
        date: '2023年5月7日',
        description: '<h1>料理艺术</h1><p>米其林三星餐厅的招牌料理，不仅美味而且摆盘精致，是一场视觉与味觉的盛宴。</p><h2>菜品介绍</h2><p>主厨特制的和牛配松露，采用特殊的低温烹饪技术。</p>',
        tags: ['美食', '晚餐', '日料'],
        likes: 92,
        comments: [
            {
                author: '美食评论家',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                text: '这家餐厅我也去过，主厨的手艺确实令人惊叹',
                time: '2天前'
            }
        ],
        images: [
            {
                url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '精致前菜'
            },
            {
                url: 'https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '主菜'
            },
            {
                url: 'https://images.unsplash.com/photo-1554318046-bedf6e46ec48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '甜点'
            }
        ]
    },
    {
        id: 6,
        title: '书房一隅',
        location: '家',
        date: '2023年10月5日',
        description: '<h1>阅读时光</h1><p>周末午后，阳光洒进书房，一本书，一杯茶，构成了最惬意的时光。</p><p>这是我的私人阅读空间，每个周末都会在这里度过几小时。</p>',
        tags: ['日常', '读书', '生活'],
        likes: 76,
        comments: [
            {
                author: '书虫一枚',
                avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
                text: '好温馨的阅读角落！请问书架上是什么书呢？',
                time: '1天前'
            },
            {
                author: '设计师小刘',
                avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
                text: '空间布置得很舒适，阳光角度也刚刚好',
                time: '3天前'
            }
        ],
        images: [
            {
                url: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '书架'
            },
            {
                url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '阅读角落'
            }
        ]
    },
    {
        id: 7,
        title: '老城街景',
        location: '布拉格老城区',
        date: '2022年9月18日',
        description: '<h1>走进历史</h1><p>历史悠久的老城区，石板路和古老建筑诉说着几个世纪的故事，漫步其中如同穿越时光。</p><h2>布拉格印象</h2><p>红色的屋顶，狭窄的巷道，每一个转角都是一幅画。</p>',
        tags: ['旅行', '城市', '历史'],
        likes: 105,
        comments: [
            {
                author: '历史爱好者',
                avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                text: '布拉格是欧洲最美的城市之一，充满了历史感',
                time: '4天前'
            }
        ],
        images: [
            {
                url: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '老城广场'
            },
            {
                url: 'https://images.unsplash.com/photo-1541849546-216549ae216d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '查理大桥'
            },
            {
                url: 'https://images.unsplash.com/photo-1458150945447-7fb764c11a92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                caption: '天文钟'
            }
        ]
    }
])

// 按日期降序排序照片
photos.value.sort((a, b) => {
    const parseDate = (dateStr) => {
        return new Date(dateStr.replace(/年|月/g, '/').replace('日', ''))
    }
    return parseDate(b.date) - parseDate(a.date)
})

// 照片墙布局类名分配函数
const getMasonryClass = (index) => {
    // 为不同位置的图片分配不同的大小类，创建视觉上的不规则布局
    const pattern = index % 8;
    switch (pattern) {
        case 0: return 'wide';
        case 3: return 'tall';
        case 5: return 'big';
        default: return '';
    }
}

// 照片详情弹窗
const showPhotoDialog = ref(false)
const currentPhotoIndex = ref(0)
const currentImageIndex = ref(0)
const newComment = ref('')
const likedPhotos = ref([]) // 存储已点赞的照片ID

// 当前照片组
const currentPhotoGroup = computed(() => photos.value[currentPhotoIndex.value])

// 当前显示的照片URL
const currentPhotoUrl = computed(() => {
    const group = currentPhotoGroup.value
    if (group && group.images && group.images.length > currentImageIndex.value) {
        return group.images[currentImageIndex.value].url
    }
    return ''
})

const showPhotoGallery = (index) => {
    currentPhotoIndex.value = index
    currentImageIndex.value = 0
    showPhotoDialog.value = true
}

const nextPhoto = () => {
    if (currentImageIndex.value < currentPhotoGroup.value.images.length - 1) {
        currentImageIndex.value++
    }
}

const prevPhoto = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    }
}

// 检查当前照片是否已点赞
const isLiked = computed(() => {
    return likedPhotos.value.includes(currentPhotoGroup.value.id)
})

// 替换原来的 toggleLike 和 addComment 方法
const handlePhotoLike = (photoId) => {
    const photoIndex = photos.value.findIndex(photo => photo.id === photoId);
    if (photoIndex === -1) return;

    if (likedPhotos.value.includes(photoId)) {
        // 取消点赞
        likedPhotos.value = likedPhotos.value.filter(id => id !== photoId);
        photos.value[photoIndex].likes--;
    } else {
        // 添加点赞
        likedPhotos.value.push(photoId);
        photos.value[photoIndex].likes++;
    }
}

const handlePhotoComment = ({ photoId, comment }) => {
    const photoIndex = photos.value.findIndex(photo => photo.id === photoId);
    if (photoIndex === -1) return;

    photos.value[photoIndex].comments.unshift(comment);
}

</script>

<style scoped>
/* 主题变量定义 保持不变 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.2);
    --bg-secondary: rgba(30, 30, 40, 0.3);
    --bg-tertiary: rgba(96, 96, 106, 0.3);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.4);
    --card-bg-hover: rgba(40, 40, 55, 0.6);
    --card-border: rgba(255, 255, 255, 0.5);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(255, 255, 255, 0.15);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: rgba(255, 255, 255, 0.5);
    --button-hover-bg: #3a7bd5;
    --photo-overlay: rgba(0, 0, 0, 0.6);
    --grid-gap: 16px;
    --accent-gradient: linear-gradient(45deg, #5a9eff, #6a5aef);
}

.page-wrapper.light {
    --bg-primary: rgba(255, 255, 255, 0.3);
    --bg-secondary: rgba(255, 255, 255, 0.4);
    --bg-tertiary: rgba(235, 235, 245, 0.3);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.4);
    --card-bg-hover: rgba(255, 255, 255, 0.6);
    --card-border: rgba(255, 255, 255, 0.8);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(255, 255, 255, 0.5);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: rgba(255, 255, 255, 0.6);
    --button-hover-bg: #3a7bd5;
    --photo-overlay: rgba(255, 255, 255, 0.7);
    --grid-gap: 16px;
    --accent-gradient: linear-gradient(45deg, #3a7bd5, #5a9eff);
}

.global-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;




    background: linear-gradient(225deg, #fcb8e2 0.000%, #feb9e4 5.000%, #ffbce7 10.000%, #ffc2ea 15.000%, #ffc8ed 20.000%, #ffd0f0 25.000%, #ffd8f3 30.000%, #fee0f6 35.000%, #fbe8f9 40.000%, #f7effb 45.000%, #f3f4fd 50.000%, #eef8ff 55.000%, #e8f9ff 60.000%, #e3f9ff 65.000%, #dcf6ff 70.000%, #d6f2ff 75.000%, #d0ecff 80.000%, #c9e5ff 85.000%, #c3ddfe 90.000%, #bdd5fc 95.000%, #b8cdfa 100.000%);
}

.page-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    position: relative;
}

.page-wrapper::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.page-content {
    padding: 80px 40px 40px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    color: var(--text-color);
}

.home-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}

.page-title {
    font-size: 40px;
    margin-bottom: 16px;
    font-weight: 600;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 30px;
    text-shadow: var(--title-shadow);
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

/* 内容容器样式 */
.section-container {
    background-color: var(--bg-primary);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    backdrop-filter: blur(10px);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.3s ease;
}

.section-container:hover {
    background-color: var(--bg-secondary);
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    margin-bottom: 20px;
    color: var(--heading-color);
    font-weight: 600;
}

.section-title .el-icon {
    color: var(--accent-color);
}

/* 照片墙瀑布流样式 */
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
    gap: 12px;
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
    transform: var(--card-hover-transform);
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

.photo-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    background: var(--photo-overlay);
    color: var(--text-color);
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

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

/* 添加照片时间标签样式 */
.photo-date {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
    z-index: 2;
}

/* 添加照片数量标签样式 */
.photo-count {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
    z-index: 2;
}

/* 照片点赞和评论数量样式 */
.photo-stats {
    /* 删除旧的绝对定位样式 */
    position: static;
    display: flex;
    gap: 10px;
    opacity: 1;
    /* 改为始终可见 */
    margin-top: 10px;
    /* 添加上边距，与位置信息分开 */
}

/* 修改照片统计项目的样式，使其更协调 */
.stat-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    /* 稍微调亮背景色 */
    color: white;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 12px;
}


.stat-icon {
    width: 16px !important;
    height: 16px !important;
    /* background-color: red; */
    margin-right: 4px;
}

/* 照片画廊弹窗样式 */
.gallery-dialog :deep(.el-dialog__header) {
    display: none;
}

.gallery-dialog :deep(.el-dialog__body) {
    padding: 20px;
}

.gallery-container {
    display: flex;
    height: 70vh;
    color: var(--text-color);
}

.gallery-slider {
    flex: 3;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
}

.current-photo {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.current-photo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.photo-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.photo-counter {
    font-size: 16px;
    font-weight: 500;
}

.photo-thumbnails {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
}

.thumbnail {
    width: 80px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail.active {
    opacity: 1;
    box-shadow: 0 0 0 3px var(--accent-color);
}

.thumbnail:hover {
    opacity: 0.9;
}

.gallery-info {
    flex: 1;
    padding: 20px;
    background-color: var(--bg-tertiary);
    border-radius: 10px;
    overflow-y: auto;
}

.gallery-info h3 {
    margin: 0 0 15px;
    font-size: 24px;
    font-weight: 600;
}

.info-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.location,
.date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-secondary);
    font-size: 15px;
}

.photo-description {
    line-height: 1.6;
    margin-bottom: 20px;
}

.photo-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

/* 照片画廊弹窗样式增强 */
.group-indicator {
    font-size: 12px;
    opacity: 0.7;
    margin-left: 5px;
}

.photo-description {
    line-height: 1.6;
    margin-bottom: 20px;
}

.photo-description h1 {
    font-size: 1.5em;
    margin: 0.5em 0;
}

.photo-description h2 {
    font-size: 1.2em;
    margin: 0.5em 0;
}

.photo-description p {
    margin: 0.75em 0;
}

/* 照片画廊弹窗新增样式 */
.photo-interaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding-top: 15px;
    border-top: 1px solid var(--divider-color);
}

.like-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 15px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.like-button:hover {
    background: rgba(255, 255, 255, 0.2);
}

.like-button.liked {
    background: rgba(255, 99, 97, 0.2);
    color: #ff6361;
}

.like-icon {
    width: 20px;
    height: 20px;
}

/* 评论区样式 */
.comments-section {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid var(--divider-color);
}

.comments-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
}

.comment-title-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.comment-list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
}

.comment-item {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.comment-content {
    flex: 1;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.comment-author {
    font-weight: 600;
}

.comment-time {
    font-size: 12px;
    color: var(--text-muted);
}

.comment-text {
    margin: 0;
    line-height: 1.5;
}

.no-comments {
    text-align: center;
    padding: 20px;
    color: var(--text-muted);
    font-style: italic;
}

.add-comment {
    margin-top: 15px;
    margin-bottom: 20px;
}

.add-comment :deep(.el-textarea__inner) {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--divider-color);
    color: var(--text-color);
}

.add-comment .el-button {
    margin-top: 10px;
    float: right;
}

/* 响应式布局 */
@media (max-width: 1200px) {
    .masonry-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    .page-title {
        font-size: 32px;
    }

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

    /* 调整标签在移动端的显示 */
    .tags {
        max-width: 100%;
        overflow-x: auto;
        padding-bottom: 5px;
        /* 允许水平滚动查看所有标签 */
        flex-wrap: nowrap;
        scrollbar-width: none;
        /* Firefox */
    }

    .tags::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari, Edge */
    }

    .gallery-container {
        flex-direction: column;
        height: auto;
    }

    .gallery-slider {
        padding-right: 0;
        margin-bottom: 20px;
    }

    .current-photo {
        height: 300px;
    }

    .photo-interaction {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .comment-header {
        flex-direction: column;
        align-items: flex-start;
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

@media (max-width: 480px) {
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