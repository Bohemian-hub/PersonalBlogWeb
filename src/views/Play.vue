<template>
    <TopBar />
    <ThemeToggler class="home-theme-toggler" />
    <div class="page-wrapper" :class="currentTheme">
        <div class="page-content">
            <!-- 页面标题区 -->
            <header class="page-header">
                <h1 class="page-title">生活足迹</h1>
                <p class="description">记录旅途风景、光影故事与旋律心声</p>
                <div class="divider">
                    <span class="divider-icon">🌍</span>
                </div>
            </header>

            <!-- 主体内容区 -->
            <div class="play-content-area">

                <!-- 旅行足迹 -->
                <section class="travel-section section-container interactive-section">
                    <h2 class="section-title">
                        <el-icon>
                            <MapLocation />
                        </el-icon>
                        旅行足迹
                    </h2>
                    <p class="section-intro">世界那么大，我想去看看。这里是我探索过的角落。</p>
                    <div class="travel-gallery">
                        <div class="travel-card" v-for="trip in travelLogs" :key="trip.id"
                            :style="{ backgroundImage: `url(${trip.imageUrl})` }">
                            <div class="card-overlay">
                                <h3 class="trip-location">{{ trip.location }}</h3>
                                <p class="trip-date">{{ trip.date }}</p>
                                <p class="trip-highlight">{{ trip.highlight }}</p>
                                <el-button size="small" type="primary" plain>探索故事</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="view-more-link">
                        <a href="#">查看所有旅行日志 &rarr;</a>
                    </div>
                </section>

                <!-- 游戏时光 -->
                <section class="games-section section-container">
                    <h2 class="section-title">
                        <el-icon>
                            <Monitor />
                        </el-icon>
                        游戏时光
                    </h2>
                    <p class="section-intro">沉浸在虚拟世界，体验不同的冒险与挑战。</p>
                    <div class="games-grid">
                        <div class="game-card" v-for="game in favoriteGames" :key="game.id">
                            <img :src="game.coverUrl" :alt="game.title" class="game-cover" />
                            <div class="game-info">
                                <h4 class="game-title">{{ game.title }}</h4>
                                <p class="game-platform">{{ game.platform }}</p>
                                <div class="game-rating">
                                    <el-rate v-model="game.rating" disabled size="small" />
                                </div>
                                <p class="game-review">{{ game.shortReview }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="currently-playing">
                        <h4>最近在玩:</h4>
                        <div class="current-game">
                            <img :src="currentlyPlaying.coverUrl" :alt="currentlyPlaying.title" />
                            <span>{{ currentlyPlaying.title }} ({{ currentlyPlaying.platform }})</span>
                        </div>
                    </div>
                </section>

                <!-- 光影世界 -->
                <section class="movies-section section-container interactive-section">
                    <h2 class="section-title">
                        <el-icon>
                            <VideoCamera />
                        </el-icon>
                        光影世界
                    </h2>
                    <p class="section-intro">电影是浓缩的人生，记录那些触动心灵的瞬间。</p>
                    <div class="movies-carousel">
                        <!-- 这里可以使用 Element Plus 的 Carousel 组件 -->
                        <el-carousel :interval="5000" type="card" height="350px">
                            <el-carousel-item v-for="movie in favoriteMovies" :key="movie.id">
                                <div class="movie-poster" :style="{ backgroundImage: `url(${movie.posterUrl})` }">
                                    <div class="poster-overlay">
                                        <h3>{{ movie.title }} ({{ movie.year }})</h3>
                                        <p>{{ movie.quote }}</p>
                                        <el-rate v-model="movie.rating" disabled size="small" />
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="view-more-link">
                        <a href="#">我的观影记录 &rarr;</a>
                    </div>
                </section>

                <!-- 音乐心声 -->
                <section class="music-section section-container">
                    <h2 class="section-title">
                        <el-icon>
                            <Headset />
                        </el-icon>
                        音乐心声
                    </h2>
                    <p class="section-intro">旋律是情绪的语言，分享我钟爱的节奏与声音。</p>
                    <div class="music-showcase">
                        <div class="current-track">
                            <h4><el-icon>
                                    <Service />
                                </el-icon> 最近在听:</h4>
                            <div class="track-info">
                                <img :src="currentTrack.albumArt" :alt="currentTrack.album" class="album-art" />
                                <div class="track-details">
                                    <p class="track-title">{{ currentTrack.title }}</p>
                                    <p class="track-artist">{{ currentTrack.artist }}</p>
                                    <p class="track-album">{{ currentTrack.album }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="favorite-playlists">
                            <h4><el-icon>
                                    <List />
                                </el-icon> 精选歌单:</h4>
                            <ul>
                                <li v-for="playlist in playlists" :key="playlist.id">
                                    <a :href="playlist.url" target="_blank">
                                        <el-icon>
                                            <Link />
                                        </el-icon> {{ playlist.name }}
                                    </a>
                                    <span> - {{ playlist.description }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
    <Footer />
    <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
        :class="{ 'dim-bg': currentTheme === 'dark' }" />
</template>

<script setup>
import { ref } from 'vue'
import {
    MapLocation, Monitor, VideoCamera, Headset,
    Link, Service, List
} from '@element-plus/icons-vue'
import TopBar from '../components/TopBar.vue'
import Footer from '../components/Footer.vue'
import ThemeToggler from '../components/ThemeToggler.vue'
import { currentTheme } from '../stores/themeStore'
// 导入背景图片，使用与Research/Studio不同的背景
import bg9Url from '@/assets/images/bg9.png' // 假设有这个图片，如果没有请替换

// 背景图片
const bgUrl = bg9Url

// 旅行日志数据
const travelLogs = ref([
    { id: 1, location: '京都', date: '2023年秋', highlight: '红叶季的禅意庭院', imageUrl: 'https://picsum.photos/400/250?random=1' },
    { id: 2, location: '冰岛', date: '2024年冬', highlight: '追逐极光的奇幻之旅', imageUrl: 'https://picsum.photos/400/250?random=1' },
    { id: 3, location: '巴厘岛', date: '2023年夏', highlight: '稻田与海滩的悠闲时光', imageUrl: 'https://picsum.photos/400/250?random=1' },
    { id: 4, location: '瑞士', date: '2022年夏', highlight: '阿尔卑斯山的壮丽风光', imageUrl: 'https://picsum.photos/400/250?random=1' }
])

// 游戏数据
const favoriteGames = ref([
    { id: 1, title: '塞尔达传说：旷野之息', platform: 'Switch', rating: 5, coverUrl: 'https://picsum.photos/400/250?random=1', shortReview: '开放世界的标杆之作，自由度极高。' },
    { id: 2, title: '巫师3：狂猎', platform: 'PC/PS4/Xbox', rating: 5, coverUrl: 'https://picsum.photos/400/250?random=2', shortReview: '剧情驱动的RPG巅峰，任务设计精妙。' },
    { id: 3, title: '空洞骑士', platform: 'PC/Switch', rating: 4.5, coverUrl: 'https://picsum.photos/400/250?random=3', shortReview: '美术风格独特，探索感十足的类银河恶魔城。' },
    { id: 4, title: '双人成行', platform: 'PC/PS5/Xbox', rating: 4.5, coverUrl: 'https://picsum.photos/400/250?random=4', shortReview: '创意十足的双人合作游戏，乐趣无穷。' }
])
const currentlyPlaying = ref({ title: '艾尔登法环', platform: 'PC', coverUrl: 'https://picsum.photos/400/250?random=5' })

// 电影数据
const favoriteMovies = ref([
    { id: 1, title: '星际穿越', year: 2014, rating: 5, posterUrl: 'https://picsum.photos/400/250?random=6', quote: '爱是唯一可以超越时间与空间的事物。' },
    { id: 2, title: '盗梦空间', year: 2010, rating: 5, posterUrl: 'https://picsum.photos/400/250?random=7', quote: '最强大的寄生虫是意念。' },
    { id: 3, title: '千与千寻', year: 2001, rating: 5, posterUrl: 'https://picsum.photos/400/250?random=8', quote: '不要忘记自己的名字。' },
    { id: 4, title: '爱乐之城', year: 2016, rating: 4.5, posterUrl: 'https://picsum.photos/400/250?random=9', quote: '敬那些做梦的人，哪怕他们有点傻。' }
])

// 音乐数据
const currentTrack = ref({
    title: 'Viva La Vida',
    artist: 'Coldplay',
    album: 'Viva La Vida or Death and All His Friends',
    albumArt: 'https://via.placeholder.com/100/92c952'
})
const playlists = ref([
    { id: 1, name: '深夜思考BGM', description: '适合安静工作的纯音乐', url: '#' },
    { id: 2, name: '公路旅行精选', description: '节奏感强的摇滚与流行', url: '#' },
    { id: 3, name: '咖啡馆爵士', description: '放松心情的慵懒旋律', url: '#' }
])

</script>

<style scoped>
/* 主题变量定义 (与 Research/Studio 保持一致) */
.page-wrapper.dark {
    --bg-primary: rgba(25, 25, 35, 0.173);
    --bg-secondary: rgba(30, 30, 40, 0.416);
    --bg-tertiary: rgba(40, 40, 55, 0.4);
    --text-color: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.8);
    --title-gradient: linear-gradient(45deg, #ffffff, #b8c6db);
    --title-shadow: 0 2px 4px rgba(216, 216, 216, 0.5);
    --divider-color: rgba(255, 255, 255, 0.5);
    --card-bg: rgba(30, 30, 40, 0.7);
    --card-bg-hover: rgba(40, 40, 55, 0.8);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    --accent-color: #68c3a3;
    /* 调整为更柔和的绿色调 */
    --accent-secondary: #56a98a;
    --heading-color: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.6);
    --tag-bg: rgba(60, 60, 80, 0.7);
    --tag-text: #ffffff;
    --card-hover-transform: translateY(-4px);
    --overlay-bg: rgba(0, 0, 0, 0.6);
    --section-intro-color: rgba(255, 255, 255, 0.7);
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
    --accent-color: #4a90e2;
    /* 浅色模式下保持蓝色调 */
    --accent-secondary: #3a7bd5;
    --heading-color: #333333;
    --text-muted: rgba(0, 0, 0, 0.5);
    --tag-bg: rgba(240, 240, 245, 0.8);
    --tag-text: #333333;
    --card-hover-transform: translateY(-3px);
    --overlay-bg: rgba(255, 255, 255, 0.7);
    --section-intro-color: rgba(0, 0, 0, 0.6);
}

/* 基础页面布局 (与 Research/Studio 保持一致) */
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
    filter: brightness(0.4) saturate(0.8);
}

.page-wrapper {
    min-height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
    position: relative;
}

.page-content {
    padding: 80px 40px 40px;
    max-width: 1200px;
    /* 稍微缩小最大宽度以适应更自由的布局 */
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
    margin-bottom: 50px;
    /* 增加页眉下边距 */
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

/* Play 页面特定内容区域 */
.play-content-area {
    display: flex;
    flex-direction: column;
    gap: 40px;
    /* 增加板块间距 */
}

.section-container {
    background-color: var(--bg-primary);
    border-radius: 16px;
    /* 增加圆角 */
    padding: 30px;
    /* 增加内边距 */
    backdrop-filter: blur(12px);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    color: var(--text-color);
    transition: all 0.4s ease;
    overflow: hidden;
    /* 防止子元素溢出 */
}

.section-container.interactive-section:hover {
    background-color: var(--bg-secondary);
    transform: scale(1.01);
    /* 轻微放大效果 */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.section-title {
    font-size: 24px;
    /* 增大标题字号 */
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--heading-color);
    border-bottom: 2px solid var(--accent-color);
    /* 标题下划线 */
    padding-bottom: 10px;
}

.section-title .el-icon {
    color: var(--accent-color);
}

.section-intro {
    font-size: 1rem;
    color: var(--section-intro-color);
    margin-bottom: 25px;
    line-height: 1.6;
}

.view-more-link {
    text-align: right;
    margin-top: 20px;
}

.view-more-link a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
}

.view-more-link a:hover {
    color: var(--accent-secondary);
    text-decoration: underline;
}

/* 旅行足迹 */
.travel-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.travel-card {
    height: 350px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.travel-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
}

.card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, var(--overlay-bg) 40%, transparent);
    padding: 40px 20px 20px;
    color: white;
    /* 覆盖层文字强制白色 */
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.travel-card:hover .card-overlay {
    opacity: 1;
    transform: translateY(0);
}

.trip-location {
    font-size: 1.4rem;
    margin-bottom: 5px;
    font-weight: bold;
}

.trip-date {
    font-size: 0.8rem;
    margin-bottom: 10px;
    opacity: 0.8;
}

.trip-highlight {
    font-size: 0.9rem;
    margin-bottom: 15px;
    line-height: 1.4;
}

/* 游戏时光 */
.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.game-card {
    background-color: var(--card-bg);
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
    display: flex;
    flex-direction: column;
}

.game-card:hover {
    transform: var(--card-hover-transform);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.game-cover {
    width: 100%;
    height: 280px;
    /* 固定封面高度 */
    object-fit: cover;
}

.game-info {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.game-title {
    font-size: 1.1rem;
    margin-bottom: 5px;
    font-weight: 600;
    color: var(--heading-color);
}

.game-platform {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 8px;
}

.game-rating {
    margin-bottom: 10px;
}

/* 修正 ElRate 在暗色模式下的颜色 */
.page-wrapper.dark .el-rate__icon {
    color: #f7ba2a !important;
    /* Element Plus 默认评分颜色 */
}

.page-wrapper.dark .el-rate__void {
    color: var(--text-muted) !important;
}

.game-review {
    font-size: 0.85rem;
    color: var(--text-secondary);
    line-height: 1.5;
    flex-grow: 1;
    /* 让评论占据剩余空间 */
}

.currently-playing {
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid var(--card-border);
    display: flex;
    align-items: center;
    gap: 15px;
}

.currently-playing h4 {
    margin: 0;
    font-size: 1rem;
    color: var(--heading-color);
}

.current-game {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--card-bg);
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
}

.current-game img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
}

/* 光影世界 */
.movies-carousel {
    margin-top: 20px;
}

.movie-poster {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    /* 内容底部对齐 */
}

.poster-overlay {
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 50%, transparent);
    padding: 20px;
    color: white;
    box-sizing: border-box;
}

.poster-overlay h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.poster-overlay p {
    font-size: 0.9rem;
    font-style: italic;
    margin-bottom: 10px;
    opacity: 0.9;
}

.el-carousel__item {
    border-radius: 10px;
}

/* 音乐心声 */
.music-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* 两列布局 */
    gap: 30px;
    margin-top: 20px;
}

.current-track h4,
.favorite-playlists h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    color: var(--heading-color);
    display: flex;
    align-items: center;
    gap: 8px;
}

.track-info {
    display: flex;
    align-items: center;
    background-color: var(--card-bg);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid var(--card-border);
}

.album-art {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 15px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.track-details p {
    margin: 0;
    line-height: 1.5;
}

.track-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--heading-color);
}

.track-artist,
.track-album {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.favorite-playlists ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.favorite-playlists li {
    margin-bottom: 12px;
    font-size: 0.9rem;
}

.favorite-playlists li a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.favorite-playlists li a:hover {
    color: var(--accent-secondary);
    text-decoration: underline;
}

.favorite-playlists li span {
    color: var(--text-muted);
    font-size: 0.85rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
    .music-showcase {
        grid-template-columns: 1fr;
        /* 音乐区改为单列 */
        gap: 40px;
    }
}

@media (max-width: 768px) {
    .page-content {
        padding: 60px 20px 20px;
    }

    .page-title {
        font-size: 32px;
    }

    .section-container {
        padding: 20px;
    }

    .travel-gallery {
        grid-template-columns: 1fr;
        /* 旅行卡片单列 */
    }

    .games-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        /* 游戏卡片更小 */
        gap: 15px;
    }

    .game-cover {
        height: 220px;
    }

    .movies-carousel .el-carousel__container {
        height: 300px !important;
        /* 调整轮播图高度 */
    }

    .poster-overlay h3 {
        font-size: 1.1rem;
    }

    .poster-overlay p {
        font-size: 0.8rem;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }
}
</style>