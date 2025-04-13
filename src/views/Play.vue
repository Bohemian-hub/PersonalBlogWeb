<template>
    <TopBar />
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 页面标题区 -->
            <header class="page-header">
                <h1 class="page-title">游民时代</h1>
                <p class="description">记录生活点滴，分享旅行见闻与个人兴趣爱好</p>
                <div class="divider">
                    <span class="divider-icon">🌈</span>
                </div>
            </header>

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
                    <div v-for="(photo, index) in photos" :key="photo.id" class="masonry-item"
                        :class="getMasonryClass(index)" @click="showPhotoGallery(index)">
                        <div class="photo-inner">
                            <img :src="photo.url" :alt="photo.title" />
                            <div class="photo-overlay">
                                <h4>{{ photo.title }}</h4>
                                <p>{{ photo.location }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 照片画廊弹窗 -->
                <el-dialog v-model="showPhotoDialog" width="85%" class="gallery-dialog" :append-to-body="true">
                    <div class="gallery-container" v-if="photos.length > 0">
                        <div class="gallery-slider">
                            <div class="current-photo">
                                <img :src="photos[currentPhotoIndex].url" :alt="photos[currentPhotoIndex].title" />
                            </div>
                            <div class="photo-controls">
                                <el-button circle @click="prevPhoto" :disabled="currentPhotoIndex === 0">
                                    <el-icon>
                                        <ArrowLeft />
                                    </el-icon>
                                </el-button>
                                <span class="photo-counter">{{ currentPhotoIndex + 1 }} / {{ photos.length }}</span>
                                <el-button circle @click="nextPhoto"
                                    :disabled="currentPhotoIndex === photos.length - 1">
                                    <el-icon>
                                        <ArrowRight />
                                    </el-icon>
                                </el-button>
                            </div>
                            <div class="photo-thumbnails">
                                <div v-for="(photo, idx) in photos" :key="idx" class="thumbnail"
                                    :class="{ active: idx === currentPhotoIndex }" @click="currentPhotoIndex = idx">
                                    <img :src="photo.url" :alt="photo.title" />
                                </div>
                            </div>
                        </div>
                        <div class="gallery-info">
                            <h3>{{ photos[currentPhotoIndex].title }}</h3>
                            <div class="info-meta">
                                <p class="location">
                                    <el-icon>
                                        <Location />
                                    </el-icon>
                                    {{ photos[currentPhotoIndex].location }}
                                </p>
                                <p class="date">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    {{ photos[currentPhotoIndex].date }}
                                </p>
                            </div>
                            <p class="photo-description">{{ photos[currentPhotoIndex].description }}</p>
                            <div class="photo-tags">
                                <el-tag size="small" v-for="tag in photos[currentPhotoIndex].tags" :key="tag">
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </section>

            <!-- 主内容区 - 日常生活和音乐收藏左右布局 -->
            <div class="content-layout">
                <!-- 日常生活板块 -->
                <section class="section-container daily-life">
                    <h2 class="section-title">
                        <el-icon>
                            <House />
                        </el-icon>
                        日常生活
                    </h2>

                    <div class="article-grid">
                        <!-- 旅行日记文章 -->
                        <div v-for="article in lifeArticles" :key="article.id" class="article-card">
                            <div class="article-cover">
                                <img :src="article.cover" :alt="article.title" />
                                <div class="article-category">{{ article.category }}</div>
                            </div>
                            <div class="article-content">
                                <h3 class="article-title">{{ article.title }}</h3>
                                <p class="article-excerpt">{{ article.excerpt }}</p>
                                <div class="article-footer">
                                    <div class="article-meta">
                                        <span class="article-date">{{ article.date }}</span>
                                        <span class="article-stats">
                                            <el-icon>
                                                <View />
                                            </el-icon> {{ article.views }}
                                        </span>
                                    </div>
                                    <el-button type="primary" size="small" class="read-btn">
                                        阅读全文 <el-icon>
                                            <ArrowRight />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pagination">
                        <el-button @click="prevPage" :disabled="currentPage === 1" plain>
                            <el-icon>
                                <ArrowLeft />
                            </el-icon> 上一页
                        </el-button>
                        <span>{{ currentPage }} / {{ totalPages }}</span>
                        <el-button @click="nextPage" :disabled="currentPage === totalPages" plain>
                            下一页 <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </el-button>
                    </div>
                </section>

                <!-- 音乐收藏板块 -->
                <section class="section-container music-collection">
                    <h2 class="section-title">
                        <el-icon>
                            <Headset />
                        </el-icon>
                        音乐收藏
                    </h2>

                    <div class="music-player">
                        <div class="current-album">
                            <div class="album-cover" :class="{ 'playing': isPlaying }">
                                <img :src="currentPlaylist.cover" :alt="currentPlaylist.title" />
                                <div class="play-overlay" @click="togglePlayPause">
                                    <el-icon v-if="!isPlaying">
                                        <VideoPlay />
                                    </el-icon>
                                    <el-icon v-else>
                                        <VideoPause />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="player-info-controls">
                                <div class="album-info">
                                    <h3>{{ currentPlaylist.title }}</h3>
                                    <p>{{ currentPlaylist.description }}</p>
                                </div>
                                <div class="player-controls">
                                    <el-slider v-model="audioProgress" :show-tooltip="false" @change="seekAudio" />
                                    <div class="time-display">
                                        <span>{{ formatTime(currentTime) }}</span>
                                        <span>{{ formatTime(duration) }}</span>
                                    </div>
                                    <div class="control-buttons">
                                        <el-button circle @click="prevTrack">
                                            <el-icon>
                                                <Back />
                                            </el-icon>
                                        </el-button>
                                        <el-button circle @click="togglePlayPause" class="play-btn">
                                            <el-icon v-if="!isPlaying">
                                                <VideoPlay />
                                            </el-icon>
                                            <el-icon v-else>
                                                <VideoPause />
                                            </el-icon>
                                        </el-button>
                                        <el-button circle @click="nextTrack">
                                            <el-icon>
                                                <Right />
                                            </el-icon>
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="playlist">
                            <div class="track-list">
                                <div v-for="(track, idx) in currentPlaylist.tracks" :key="idx" class="track-item"
                                    :class="{ 'current-track': currentTrackIndex === idx }" @click="playTrack(idx)">
                                    <div class="track-number">{{ idx + 1 }}</div>
                                    <div class="track-info">
                                        <div class="track-name">{{ track.title }}</div>
                                        <div class="track-artist">{{ track.artist }}</div>
                                    </div>
                                    <div class="track-duration">{{ track.duration }}</div>
                                    <div class="track-play-icon" v-if="currentTrackIndex === idx && isPlaying">
                                        <div class="playing-animation">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 隐藏的音频元素 -->
                    <audio ref="audioPlayer" @timeupdate="onTimeUpdate" @loadedmetadata="onAudioLoaded"
                        @ended="onAudioEnded" @error="handleAudioError"></audio>
                </section>
            </div>
        </div>
    </div>
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
    Picture, Location, Calendar, House, View,
    ArrowLeft, ArrowRight, VideoPlay, VideoPause, Headset, Back, Right
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import { currentTheme } from '../stores/themeStore'
import bgPlayUrl from '@/assets/images/bg5.png'
import { ElMessage } from 'element-plus'

// 背景图片
const bgUrl = bgPlayUrl

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

// 照片墙数据
const photos = ref([
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '山水之间',
        location: '瑞士阿尔卑斯山',
        date: '2023年7月15日',
        description: '阿尔卑斯山脉的壮丽景色，湛蓝的天空下，雪山与湖泊构成了一幅完美的自然画卷。',
        tags: ['旅行', '自然', '山脉']
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '晨光早餐',
        location: '巴黎咖啡馆',
        date: '2023年8月3日',
        description: '在巴黎街头的小咖啡馆享用的丰盛早餐，阳光透过窗户撒在桌上，温暖而惬意。',
        tags: ['美食', '旅行', '早餐']
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '傍晚海滩',
        location: '巴厘岛库塔海滩',
        date: '2023年9月20日',
        description: '夕阳西下，海浪轻拍沙滩，天空被染成金色和紫色，这是一天中最美的时刻。',
        tags: ['旅行', '海滩', '夕阳']
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '冰川湖泊',
        location: '新西兰',
        date: '2022年12月10日',
        description: '澄澈的湖水映照着雪山，宛如一面巨大的镜子，反射出大自然的壮丽景色。',
        tags: ['自然', '湖泊', '雪山']
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '精致晚餐',
        location: '东京米其林餐厅',
        date: '2023年5月7日',
        description: '米其林三星餐厅的招牌料理，不仅美味而且摆盘精致，是一场视觉与味觉的盛宴。',
        tags: ['美食', '晚餐', '日料']
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '书房一隅',
        location: '家',
        date: '2023年10月5日',
        description: '周末午后，阳光洒进书房，一本书，一杯茶，构成了最惬意的时光。',
        tags: ['日常', '读书', '生活']
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        title: '老城街景',
        location: '布拉格老城区',
        date: '2022年9月18日',
        description: '历史悠久的老城区，石板路和古老建筑诉说着几个世纪的故事，漫步其中如同穿越时光。',
        tags: ['旅行', '城市', '历史']
    }
])

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

const showPhotoGallery = (index) => {
    currentPhotoIndex.value = index
    showPhotoDialog.value = true
}

const nextPhoto = () => {
    if (currentPhotoIndex.value < photos.value.length - 1) {
        currentPhotoIndex.value++
    }
}

const prevPhoto = () => {
    if (currentPhotoIndex.value > 0) {
        currentPhotoIndex.value--
    }
}

// 日常生活文章数据 - 合并了旅行日记、兴趣爱好和书影推荐
const allArticles = ref([
    {
        id: 1,
        title: '京都の秋 - 红叶与古寺',
        category: '旅行日记',
        date: '2023年11月',
        cover: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '深秋时节的京都，红叶如火，古寺庭院中落叶缤纷，漫步在这座千年古城，仿佛穿越回了平安时代。',
        views: 325
    },
    {
        id: 2,
        title: '北欧极光之旅 - 追寻夜空中的舞者',
        category: '旅行日记',
        date: '2023年1月',
        cover: 'https://images.unsplash.com/photo-1483086431886-3590a88317fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '零下20度的寒冷夜晚，漫天繁星下，耐心地等待着北极光的出现。当第一抹绿光在天际浮现时，所有的寒冷瞬间消散。',
        views: 452
    },
    {
        id: 3,
        title: '摄影入门指南：如何拍出有故事的照片',
        category: '兴趣爱好',
        date: '2024年2月',
        cover: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '摄影不仅是记录，更是讲述故事的艺术。本文分享我的摄影经验，从构图、光线到后期处理的实用技巧。',
        views: 287
    },
    {
        id: 4,
        title: '意大利面的50种做法 - 从经典到创新',
        category: '兴趣爱好',
        date: '2024年3月',
        cover: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '从传统的博洛尼亚肉酱面到创新的松露奶油意面，探索这个充满魔力的意大利美食世界。',
        views: 314
    },
    {
        id: 5,
        title: '2024年必看的五部科幻电影',
        category: '书影推荐',
        date: '2024年4月',
        cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '从太空冒险到人工智能伦理，这五部科幻电影不仅有震撼的视觉效果，更有深刻的思想内涵。',
        views: 195
    },
    {
        id: 6,
        title: '那些改变我人生轨迹的书籍',
        category: '书影推荐',
        date: '2023年12月',
        cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '分享五本对我影响深远的书籍，它们在不同人生阶段给予我力量、智慧和勇气。',
        views: 263
    },
    {
        id: 7,
        title: '威尼斯水城漫步 - 迷失在水巷里',
        category: '旅行日记',
        date: '2022年6月',
        cover: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '没有汽车喧嚣的城市，只有贡多拉穿梭在纵横交错的水道上。每一座桥、每一条巷子都藏着故事。',
        views: 287
    },
    {
        id: 8,
        title: '徒步者的装备指南 - 从新手到专业',
        category: '兴趣爱好',
        date: '2024年1月',
        cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '无论是周末短途还是长线徒步，适合的装备能让旅程更安全、舒适。本文详解各类装备的选择与使用。',
        views: 231
    },
    {
        id: 9,
        title: '百年孤独 - 一场魔幻的文学盛宴',
        category: '书影推荐',
        date: '2023年9月',
        cover: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        excerpt: '加西亚·马尔克斯的代表作如何通过魔幻现实主义的手法，展现了拉丁美洲的历史与文化。',
        views: 175
    }
])

// 分页控制 - 确保每页只有3个文章
const articlesPerPage = 3
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(allArticles.value.length / articlesPerPage))

// 当前页显示的文章
const lifeArticles = computed(() => {
    const start = (currentPage.value - 1) * articlesPerPage
    const end = start + articlesPerPage
    return allArticles.value.slice(start, end)
})

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}

// 音乐收藏与播放功能
// 修改播放列表，使用更可靠的音源
const currentPlaylist = ref({
    title: '午后时光',
    description: '适合安静阅读或工作时聆听的轻音乐集',
    cover: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tracks: [

        {
            title: 'Kiss the Rain',
            artist: 'Yiruma',
            duration: '4:11',
            url: 'https://music.163.com/song/media/outer/url?id=29450088.mp3',
            backupUrl: 'https://freepd.com/music/Inspiring%20Corporate.mp3'
        },
        {
            title: 'Path of the Wind',
            artist: 'Joe Hisaishi',
            duration: '3:17',
            url: 'https://music.163.com/song/media/outer/url?id=448706028.mp3',
            backupUrl: 'https://freepd.com/music/Night%20Run.mp3'
        }
    ]
})

// 音频播放相关
const audioPlayer = ref(null)
const isPlaying = ref(false)
const currentTrackIndex = ref(0)
const audioProgress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const useBackupSource = ref(false)

// 格式化时间
const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
}

// 处理音频错误
const handleAudioError = (error) => {
    console.error('音频加载错误:', error);

    const currentTrack = currentPlaylist.value.tracks[currentTrackIndex.value];

    // 尝试使用备用链接
    if (!useBackupSource.value && currentTrack.backupUrl) {
        useBackupSource.value = true;
        audioPlayer.value.src = currentTrack.backupUrl;
        audioPlayer.value.load();
        if (isPlaying.value) {
            audioPlayer.value.play().catch(err => {
                ElMessage.error('无法播放音频，请检查网络连接');
                isPlaying.value = false;
            });
        }
    } else {
        ElMessage.warning(`无法播放 "${currentTrack.title}"，可能是音源不可用`);
        isPlaying.value = false;
    }
}

// 播放/暂停切换
const togglePlayPause = () => {
    if (audioPlayer.value) {
        if (isPlaying.value) {
            audioPlayer.value.pause();
        } else {
            audioPlayer.value.play().catch(err => {
                handleAudioError(err);
            });
        }
        isPlaying.value = !isPlaying.value;
    }
}

// 播放指定曲目
const playTrack = (index) => {
    currentTrackIndex.value = index;
    useBackupSource.value = false; // 重置备用源标志
    loadTrack();
    audioPlayer.value.play().catch(err => {
        handleAudioError(err);
    });
    isPlaying.value = true;
}

// 加载当前曲目
const loadTrack = () => {
    if (audioPlayer.value && currentPlaylist.value.tracks[currentTrackIndex.value]) {
        const track = currentPlaylist.value.tracks[currentTrackIndex.value];
        audioPlayer.value.src = useBackupSource.value ? track.backupUrl : track.url;
        audioPlayer.value.load();
    }
}

// 下一曲
const nextTrack = () => {
    if (currentTrackIndex.value < currentPlaylist.value.tracks.length - 1) {
        currentTrackIndex.value++;
        useBackupSource.value = false; // 重置备用源标志
        loadTrack();
        if (isPlaying.value) {
            audioPlayer.value.play().catch(err => {
                handleAudioError(err);
            });
        }
    }
}

// 上一曲
const prevTrack = () => {
    if (currentTrackIndex.value > 0) {
        currentTrackIndex.value--;
        useBackupSource.value = false; // 重置备用源标志
        loadTrack();
        if (isPlaying.value) {
            audioPlayer.value.play().catch(err => {
                handleAudioError(err);
            });
        }
    }
}

// 进度条更新
const onTimeUpdate = () => {
    if (audioPlayer.value) {
        currentTime.value = audioPlayer.value.currentTime;
        audioProgress.value = (audioPlayer.value.currentTime / audioPlayer.value.duration) * 100;
    }
}

// 音频加载完成
const onAudioLoaded = () => {
    if (audioPlayer.value) {
        duration.value = audioPlayer.value.duration;
    }
}

// 音频播放结束
const onAudioEnded = () => {
    nextTrack();
}

// 拖动进度条
const seekAudio = (value) => {
    if (audioPlayer.value) {
        const seekTime = (value / 100) * audioPlayer.value.duration;
        audioPlayer.value.currentTime = seekTime;
    }
}

// 监听轨道变化，自动加载新曲目
watch(currentTrackIndex, () => {
    loadTrack();
})

// 组件挂载时加载第一首曲目
onMounted(() => {
    loadTrack();
})
</script>

<style scoped>
/* 主题变量定义 保持不变 */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.173);
    --bg-secondary: rgba(30, 30, 40, 0.416);
    --bg-tertiary: rgba(96, 96, 106, 0.4);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #5a9eff;
    --accent-secondary: #4a90e2;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --timeline-line: rgba(255, 255, 255, 0.2);
    --timeline-dot: #5a9eff;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: transparent;
    --button-hover-bg: #3a7bd5;
    --photo-overlay: rgba(0, 0, 0, 0.6);
    --grid-gap: 16px;
    --accent-gradient: linear-gradient(45deg, #5a9eff, #6a5aef);
}

.page-wrapper.light {
    --bg-primary: rgba(245, 245, 250, 0.85);
    --bg-secondary: rgba(255, 255, 255, 0.9);
    --bg-tertiary: rgba(235, 235, 245, 0.7);
    --text-color: #333333;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --title-gradient: linear-gradient(45deg, #333333, #555555);
    --title-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    --divider-color: rgba(0, 0, 0, 0.2);
    --card-bg: rgba(255, 255, 255, 0.85);
    --card-bg-hover: rgba(255, 255, 255, 0.95);
    --card-border: rgba(0, 0, 0, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    --accent-color: #3a7bd5;
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --timeline-line: rgba(0, 0, 0, 0.1);
    --timeline-dot: #3a7bd5;
    --button-bg: #4a90e2;
    --button-text: white;
    --button-border: transparent;
    --button-hover-bg: #3a7bd5;
    --photo-overlay: rgba(255, 255, 255, 0.7);
    --grid-gap: 16px;
    --accent-gradient: linear-gradient(45deg, #3a7bd5, #5a9eff);
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

/* 左右布局 */
.content-layout {
    display: flex;
    gap: 30px;
}

.daily-life {
    flex: 2;
}

.music-collection {
    flex: 1;
}

/* 日常生活文章卡片 */
.article-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.article-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.article-card:hover {
    transform: var(--card-hover-transform);
    background-color: var(--card-bg-hover);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.article-cover {
    position: relative;
    padding-top: 56.25%;
    /* 16:9 比例 */
}

.article-cover img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-category {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--accent-gradient);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.article-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.article-title {
    margin: 0 0 10px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
}

.article-excerpt {
    color: var(--text-secondary);
    margin: 0 0 15px;
    line-height: 1.6;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    flex: 1;
}

.article-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
}

.article-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    color: var(--text-muted);
    font-size: 14px;
}

.article-stats {
    display: flex;
    align-items: center;
    gap: 5px;
}

.read-btn {
    border-radius: 20px;
}

/* 分页控制 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
}

/* 音乐播放器样式 - 调整封面大小 */
.music-player {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 将音乐播放器改为水平布局 */
.current-album {
    position: relative;
    display: flex;
    flex-direction: row; /* 改为水平排列 */
    align-items: center; /* 垂直居中对齐 */
    gap: 20px;
}

/* 调整封面尺寸 */
.album-cover {
    position: relative;
    width: 120px; /* 固定宽度 */
    height: 120px; /* 固定高度，保持正方形 */
    flex-shrink: 0; /* 防止缩小 */
    padding-top: 0; /* 移除之前的padding-top百分比设置 */
    margin: 0; /* 移除自动居中 */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.album-cover img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
}

.album-cover.playing img {
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.album-cover:hover .play-overlay {
    opacity: 1;
}

.play-overlay .el-icon {
    font-size: 48px;
    color: white;
}


/* 调整专辑信息和控制区布局 */
.player-info-controls {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* 占据剩余空间 */
}

.album-info {
    text-align: left; /* 左对齐 */
    margin-bottom: 15px;
}

.album-info h3 {
    margin: 0 0 5px;
    font-size: 20px;
    font-weight: 600;
}

.album-info p {
    color: var(--text-secondary);
    margin: 0;
    font-size: 14px;
}

.player-controls {
    width: 100%;
}

.time-display {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 12px;
    color: var(--text-muted);
}

.control-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
}

.play-btn {
    transform: scale(1.2);
    background: var(--accent-gradient);
    border: none;
    color: white;
}

.playlist {
    background-color: var(--bg-tertiary);
    border-radius: 10px;
    padding: 15px;
    max-height: 300px;
    overflow-y: auto;
}

.track-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.track-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.2s ease;
    cursor: pointer;
}

.track-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.track-item.current-track {
    background-color: var(--accent-color);
    color: white;
}

.track-number {
    width: 24px;
    font-weight: 500;
}

.track-info {
    flex: 1;
    overflow: hidden;
}

.track-name {
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.track-artist {
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    opacity: 0.8;
}

.track-duration {
    font-size: 12px;
    opacity: 0.8;
    margin: 0 10px;
}

.track-play-icon {
    width: 20px;
}

.playing-animation {
    display: flex;
    align-items: flex-end;
    height: 15px;
    gap: 2px;
}

.playing-animation span {
    width: 3px;
    background-color: white;
    border-radius: 1px;
    animation: audio-wave 1.2s infinite ease-in-out;
}

.playing-animation span:nth-child(1) {
    animation-delay: 0s;
    height: 8px;
}

.playing-animation span:nth-child(2) {
    animation-delay: 0.3s;
    height: 15px;
}

.playing-animation span:nth-child(3) {
    animation-delay: 0.6s;
    height: 10px;
}

@keyframes audio-wave {
    0% {
        height: 5px;
    }

    50% {
        height: 15px;
    }

    100% {
        height: 5px;
    }
}


/* 响应式布局 */
@media (max-width: 1200px) {
    .masonry-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .content-layout {
        flex-direction: column;
    }

    .daily-life,
    .music-collection {
        width: 100%;
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
        grid-template-columns: repeat(2, 1fr);
    }

    .article-grid {
        grid-template-columns: repeat(2, 1fr);
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
}

@media (max-width: 480px) {
    .masonry-grid {
        grid-template-columns: 1fr;
    }

    .article-grid {
        grid-template-columns: 1fr;
    }

    .control-buttons {
        gap: 10px;
    }
}
</style>