<template>
    <div class="article-page" :class="currentTheme">
        <TopBar :visible="showTopBar" />

        <div class="article-container">
            <!-- 顶部封面图 -->
            <div class="article-cover" :style="{ backgroundImage: `url('${article.coverUrl}')` }">
                <div class="cover-overlay">
                    <div class="article-meta-floating">
                        <div class="article-category">{{ article.category }}</div>
                        <h1 class="article-title-floating">{{ article.title }}</h1>
                    </div>
                </div>
            </div>

            <!-- 文章主体内容 -->
            <div class="article-content-wrapper">
                <div class="article-header">
                    <!-- <h1 class="article-title">{{ article.title }}</h1> -->

                    <div class="article-info">
                        <div class="author-info">
                            <img :src="article.author.avatar" alt="作者头像" class="author-avatar">
                            <div class="author-details">
                                <div class="author-name">{{ article.author.name }}</div>
                                <div class="article-date">{{ formatDate(article.publishDate) }}</div>
                            </div>
                        </div>

                        <div class="article-stats">
                            <span class="stat-item"><i class="icon-eye"></i> {{ article.views }}</span>
                            <span class="stat-item"><i class="icon-heart"></i> {{ article.likes }}</span>
                            <span class="stat-item"><i class="icon-comment"></i> {{ article.comments.length }}</span>
                        </div>
                    </div>

                    <div class="article-tags">
                        <span class="tag" v-for="(tag, index) in article.tags" :key="index">{{ tag }}</span>
                    </div>

                    <!-- 添加摘要部分 -->
                    <div class="article-summary">
                        <p>{{ article.summary }}</p>
                    </div>
                </div>

                <!-- 文章正文 (渲染Markdown) -->
                <div class="article-content" v-html="renderedContent"></div>

                <!-- 分割线 -->
                <div class="content-divider">
                    <span class="divider-icon">✦</span>
                </div>

                <!-- 操作栏（从底部移至此处） -->
                <div class="article-actions-bar">
                    <div class="actions-container">
                        <div class="action-btn" @click="toggleLike">
                            <div class="action-icon-wrapper" :class="{ 'liked': isLiked }">
                                <i class="icon-heart"></i>
                            </div>
                            <span>{{ article.likes }}</span>
                        </div>
                        <div class="action-btn">
                            <div class="action-icon-wrapper">
                                <i class="icon-bookmark"></i>
                            </div>
                            <span>收藏</span>
                        </div>
                        <div class="action-btn" @click="shareArticle">
                            <div class="action-icon-wrapper">
                                <i class="icon-share"></i>
                            </div>
                            <span>分享</span>
                        </div>
                    </div>
                </div>

                <!-- 评论区域 -->
                <div class="comments-section">
                    <h2 class="section-title">评论区 ({{ article.comments.length }})</h2>

                    <!-- 评论输入框 -->
                    <div class="comment-input-container">
                        <div class="comment-avatar">
                            <img :src="currentUser.avatar" alt="Your avatar">
                        </div>
                        <div class="comment-input-wrapper">
                            <textarea v-model="newComment" placeholder="写下你的评论..." class="comment-input"
                                @focus="inputFocused = true" @blur="inputFocused = false"></textarea>
                            <div class="comment-actions" :class="{ 'active': inputFocused || newComment }">
                                <button class="cancel-btn" @click="newComment = ''">取消</button>
                                <button class="submit-btn" @click="addComment"
                                    :disabled="!newComment.trim()">发表评论</button>
                            </div>
                        </div>
                    </div>

                    <!-- 评论列表 -->
                    <div class="comments-list" v-if="article.comments.length > 0">
                        <div class="comment-item" v-for="(comment, index) in article.comments" :key="index">
                            <div class="comment-avatar">
                                <img :src="comment.avatar" :alt="`${comment.author} avatar`">
                            </div>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <span class="comment-author">{{ comment.author }}</span>
                                    <span class="comment-date">{{ formatDate(comment.date) }}</span>
                                </div>
                                <p class="comment-text">{{ comment.content }}</p>
                                <div class="comment-actions-row">
                                    <div class="comment-action" @click="toggleLikeComment(index)">
                                        <i :class="['icon-heart', { 'active': comment.isLiked }]"></i>
                                        <span>{{ comment.likes }}</span>
                                    </div>
                                    <div class="comment-action" @click="replyToComment(comment)">
                                        <i class="icon-reply"></i>
                                        <span>回复</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 暂无评论提示 -->
                    <div class="no-comments" v-else>
                        <div class="no-comments-icon">💬</div>
                        <p>暂无评论，成为第一个评论的人吧！</p>
                    </div>
                </div>
            </div>

            <!-- 返回顶部按钮 -->
            <div class="back-to-top" v-show="showBackToTop" :class="{ 'show': showBackToTop }" @click="scrollToTop">
                <i class="icon-arrow-up"></i>
            </div>

            <!-- 分享弹窗 -->
            <div class="share-modal" v-if="showShareModal" @click.self="showShareModal = false">
                <div class="share-modal-content">
                    <h3>分享文章</h3>
                    <div class="share-options">
                        <div class="share-option" @click="shareVia('wechat')">
                            <div class="share-icon wechat">微信</div>
                            <span>微信</span>
                        </div>
                        <div class="share-option" @click="shareVia('weibo')">
                            <div class="share-icon weibo">微博</div>
                            <span>微博</span>
                        </div>
                        <div class="share-option" @click="shareVia('twitter')">
                            <div class="share-icon twitter">Twitter</div>
                            <span>Twitter</span>
                        </div>
                        <div class="share-option" @click="copyLink">
                            <div class="share-icon link">链接</div>
                            <span>复制链接</span>
                        </div>
                    </div>
                    <button class="close-modal-btn" @click="showShareModal = false">关闭</button>
                </div>
            </div>

            <!-- 背景图片 -->
            <el-image class="bg-image" :src="bgUrl" :fit="'cover'" draggable="false"
                :class="{ 'dim-bg': currentTheme === 'dark' }" />
        </div>
        <!-- 添加主题切换按钮 -->
        <ThemeToggler class="home-theme-toggler" />
        <!-- 底部版权和备案信息 -->
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import TopBar from '../components/TopBar.vue'
import ThemeToggler from '../components/ThemeToggler.vue' // 导入主题切换组件
import Footer from '../components/Footer.vue'  // 导入新的Footer组件
import { currentTheme } from '../stores/themeStore' // 导入主题变量
// 添加背景图片URL
const bgUrl = 'https://picsum.photos/1920/1080?blur=5'; // 使用模糊效果的背景图，也可以导入本地图片

const newComment = ref('');
const isLiked = ref(false);
const inputFocused = ref(false);
const showBackToTop = ref(false);
const showShareModal = ref(false);
// 创建一个响应式变量来控制TopBar的显示和隐藏
const showTopBar = ref(true)
// 声明一个变量存储添加的meta标签
let articleMetaTags = [];
// 当前用户信息（实际应用中应从用户系统获取）
const currentUser = {
    id: 'current-user',
    name: '当前用户',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
};

// 示例文章数据
const article = ref({
    id: 1,
    title: '深度学习在自然语言处理中的应用与挑战',
    coverUrl: 'https://picsum.photos/1920/1080?random=25',
    category: '学术札记',
    summary: '本文探讨了深度学习技术在自然语言处理领域的最新应用及面临的主要挑战...',
    content: `
  
  ## 引言
  
  自然语言处理(NLP)是人工智能领域的重要分支，致力于让计算机理解、解释和生成人类语言。随着深度学习技术的发展，NLP领域取得了显著进步。本文将探讨深度学习在NLP中的应用及当前面临的挑战。
  
  ## 深度学习模型在NLP中的应用
  
  ### Transformer架构及其变体
  
  Transformer架构自2017年提出以来，彻底改变了NLP领域。它基于自注意力机制，能够并行处理序列数据，克服了RNN的长序列依赖问题。
  
  \`\`\`python
  # 简化的自注意力机制实现
  def self_attention(query, key, value, mask=None):
      # 计算注意力分数
      scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
      
      # 应用mask（如果提供）
      if mask is notNone:
          scores = scores.masked_fill(mask == 0, -1e9)
      
      # Softmax归一化
      attention_weights = F.softmax(scores, dim=-1)
      
      # 加权求和
      output = torch.matmul(attention_weights, value)
      return output, attention_weights
  \`\`\`
  
  ### BERT与上下文表示
  
  BERT(Bidirectional Encoder Representations from Transformers)通过双向训练获取上下文信息，极大提升了各类NLP任务的性能：
  
  1. **预训练**: 使用掩码语言模型(MLM)和下一句预测(NSP)进行无监督学习
  2. **微调**: 针对特定任务进行有监督学习
  
  ### 大型语言模型(LLM)
  
  如GPT系列、LLaMA等大型语言模型展现出令人惊叹的语言理解和生成能力，推动了NLP领域的研究边界。
  
  ## 当前NLP面临的挑战
  
  ### 1. 数据隐私与偏见
  
  大型语言模型依赖互联网数据训练，往往会：
  - 继承数据中的社会偏见
  - 产生伦理问题
  - 涉及个人隐私
  
  ### 2. 推理效率与资源消耗
  
  当代LLM通常包含数十亿参数，带来严重问题：
  
  | 模型 | 参数量 | 推理GPU需求 | 训练成本估计 |
  |------|--------|------------|------------|
  | BERT-large | 340M | 单GPU | 数万美元 |
  | GPT-3 | 175B | 多GPU集群 | 数百万美元 |
  | GPT-4 | 1T+ (估计) | 专用基础设施 | 数千万美元 |
  
  ### 3. 长文本理解与跨文档推理
  
  长文本处理仍是一个重大挑战，需要解决：
  - 上下文窗口限制
  - 注意力复杂度问题
  - 长距离依赖建模
  
  ## 未来研究方向
  
  * **效率优化**: 模型压缩、知识蒸馏、量化技术
  * **多模态融合**: 结合视觉、音频与文本信息
  * **知识增强**: 整合外部知识库提升推理能力
  * **可解释性**: 提升模型决策的透明度与可解释性
  
  ## 结论
  
  深度学习为NLP带来了革命性进步，但仍面临诸多挑战。未来研究需要平衡模型能力与效率、伦理与实用性，才能推动NLP技术向更加成熟的方向发展。
  
  ## 参考文献
  
  1. Vaswani, A., et al. (2017). Attention is all you need.
  2. Devlin, J., et al. (2018). BERT: Pre-training of deep bidirectional transformers for language understanding.
  3. Brown, T., et al. (2020). Language models are few-shot learners.
    `,
    publishDate: '2023-09-15T08:30:00',
    updateDate: '2023-09-16T10:45:00',
    author: {
        id: 'author-1',
        name: 'HeDong',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        bio: 'AI研究者 | 数据科学爱好者'
    },
    tags: ['深度学习', 'NLP', '人工智能', '研究'],
    views: 2568,
    likes: 142,
    comments: [
        {
            id: 'comment-1',
            author: '林小明',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            content: '文章写得很棒！对Transformer架构的解释特别清晰，让我对自注意力机制有了更深入的理解。',
            date: '2023-09-16T14:30:00',
            likes: 24,
            isLiked: false
        },
        {
            id: 'comment-2',
            author: '张雨琪',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            content: '关于大模型效率的讨论很有见地。不知道作者有没有考虑过量化技术方面的最新进展？',
            date: '2023-09-17T10:15:00',
            likes: 18,
            isLiked: false
        },
        {
            id: 'comment-3',
            author: '王大力',
            avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
            content: '请问文中提到的"知识蒸馏"技术有什么推荐的论文吗？我最近正在研究相关方向。',
            date: '2023-09-18T16:45:00',
            likes: 12,
            isLiked: false
        }
    ]
});

// 使用marked库解析Markdown
// 配置highlight.js来渲染代码块
marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-',
    gfm: true,
    breaks: true
});

// 将Markdown渲染为HTML
const renderedContent = computed(() => {
    return marked(article.value.content);
});

// 添加评论
const addComment = () => {
    if (!newComment.value.trim()) return;

    const comment = {
        id: `comment-${Date.now()}`,
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: newComment.value,
        date: new Date().toISOString(),
        likes: 0,
        isLiked: false
    };

    article.value.comments.unshift(comment);
    newComment.value = '';
};

// 回复评论
const replyToComment = (comment) => {
    // 设置评论框内容为回复格式
    newComment.value = `@${comment.author} `;
    // 聚焦评论框
    document.querySelector('.comment-input').focus();
    // 滚动到评论框
    document.querySelector('.comment-input-container').scrollIntoView({ behavior: 'smooth' });
};

// 点赞/取消点赞评论
const toggleLikeComment = (index) => {
    const comment = article.value.comments[index];
    if (comment.isLiked) {
        comment.likes--;
    } else {
        comment.likes++;
    }
    comment.isLiked = !comment.isLiked;
};

// 点赞/取消点赞文章
const toggleLike = () => {
    if (isLiked.value) {
        article.value.likes--;
    } else {
        article.value.likes++;
    }
    isLiked.value = !isLiked.value;
};

// 分享文章
const shareArticle = () => {
    showShareModal.value = true;
};

// 通过不同平台分享
const shareVia = (platform) => {
    // 实际应用中应根据不同平台实现分享逻辑
    console.log(`通过${platform}分享文章: ${article.value.title}`);
    showShareModal.value = false;
};

// 复制文章链接
const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板');
        showShareModal.value = false;
    });
};

// 日期格式化
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 返回顶部
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 监听滚动事件以显示/隐藏返回顶部按钮
const handleScroll = () => {
    showBackToTop.value = window.scrollY > 500;
    // 当滚动位置为0（页面顶部）时显示TopBar，否则隐藏
    showTopBar.value = window.scrollY <= 400
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    // 设置文章标题为网页标题
    document.title = `${article.value.title} - Hedong的个人博客`;

    // 添加分享所需的meta标签
    const metaTags = [
        // Open Graph协议标签（微信、微博等平台通用）
        { property: 'og:title', content: article.value.title },
        { property: 'og:description', content: article.value.summary },
        { property: 'og:image', content: article.value.coverUrl },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'article' },

        // 微信特定标签
        { name: 'description', content: article.value.summary },
        { itemprop: 'name', content: article.value.title },
        { itemprop: 'description', content: article.value.summary },
        { itemprop: 'image', content: article.value.coverUrl }
    ];

    // 保存已添加的标签引用，以便在组件卸载时移除
    const addedTags = [];

    metaTags.forEach(tagInfo => {
        const metaTag = document.createElement('meta');

        // 设置标签属性
        Object.keys(tagInfo).forEach(key => {
            metaTag.setAttribute(key, tagInfo[key]);
        });

        // 添加到文档头部
        document.head.appendChild(metaTag);
        addedTags.push(metaTag);
    });

    // 添加到组件实例上，以便在卸载时引用
    articleMetaTags = addedTags;
});


onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);

    // 移除添加的meta标签
    articleMetaTags.forEach(tag => {
        if (document.head.contains(tag)) {
            document.head.removeChild(tag);
        }
    });
});
</script>

<style scoped>
.article-page.dark {
    --article-bg: rgba(25, 25, 35, 0.8);
    --article-text: #ffffff;
    --article-secondary: rgba(255, 255, 255, 0.8);
    --article-tertiary: rgba(255, 255, 255, 0.6);
    --heading-color: #e1e6fa;
    --card-bg: rgba(40, 40, 50, 0.8);
    --card-shadow: rgba(0, 0, 0, 0.25);
    --card-border: rgba(255, 255, 255, 0.1);
    --accent-color: #7a92e6;
    --tag-bg: rgba(40, 40, 60, 0.7);
    --tag-text: #ffffff;
    --divider-color: rgba(255, 255, 255, 0.1);
    --title-gradient: linear-gradient(45deg, #a0b8ff, #7a92e6);
    --title-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    --btn-primary-bg: #7a92e6;
    --btn-primary-text: #ffffff;
    --btn-hover-bg: #8da3f7;
    --icon-color: rgba(255, 255, 255, 0.7);
    --code-bg: rgba(30, 30, 40, 0.95);
    --blockquote-border: #7a92e6;
    --blockquote-bg: rgba(122, 146, 230, 0.1);
    --scrollbar-track: rgba(30, 30, 40, 0.8);
    --scrollbar-thumb: rgba(255, 255, 255, 0.2);
    --content-wrapper-bg: rgba(30, 30, 45, 0.75);
    --overlay-gradient: linear-gradient(to bottom, rgba(20, 20, 30, 0.85), rgba(10, 10, 18, 0.9));
    --comment-bg: rgba(255, 255, 255, 0.05);
    --comment-border: rgba(255, 255, 255, 0.1);
    --comment-text: rgba(255, 255, 255, 0.95);
    --actions-bar-bg: rgba(30, 30, 45, 0.5);
    --actions-bar-border: rgba(255, 255, 255, 0.12);
    --summary-bg: rgba(255, 255, 255, 0.05);
}

.article-page.light {
    --article-bg: rgba(255, 255, 255, 0.9);
    --article-text: #333333;
    --article-secondary: rgba(0, 0, 0, 0.7);
    --article-tertiary: rgba(0, 0, 0, 0.5);
    --heading-color: #2c3e50;
    --card-bg: rgba(255, 255, 255, 0.95);
    --card-shadow: rgba(0, 0, 0, 0.1);
    --card-border: rgba(0, 0, 0, 0.1);
    --accent-color: #4a6cb3;
    --tag-bg: rgba(240, 240, 255, 0.8);
    --tag-text: #333333;
    --divider-color: rgba(0, 0, 0, 0.1);
    --title-gradient: linear-gradient(45deg, #2c3e50, #4a6cb3);
    --title-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    --btn-primary-bg: #4a6cb3;
    --btn-primary-text: #ffffff;
    --btn-hover-bg: #5d7ec4;
    --icon-color: rgba(0, 0, 0, 0.6);
    --code-bg: rgba(245, 245, 250, 0.95);
    --blockquote-border: #4a6cb3;
    --blockquote-bg: rgba(74, 108, 179, 0.05);
    --scrollbar-track: rgba(240, 240, 245, 0.8);
    --scrollbar-thumb: rgba(0, 0, 0, 0.15);
    --content-wrapper-bg: rgba(255, 255, 255, 0.85);
    --overlay-gradient: linear-gradient(to bottom, rgba(245, 245, 250, 0.5), rgba(235, 235, 240, 0.8));
    --comment-bg: rgba(0, 0, 0, 0.03);
    --comment-border: rgba(0, 0, 0, 0.1);
    --comment-text: rgba(0, 0, 0, 0.8);
    --actions-bar-bg: rgba(240, 240, 245, 0.7);
    --actions-bar-border: rgba(0, 0, 0, 0.08);
    --summary-bg: rgba(0, 0, 0, 0.03);
}

/* 让背景图片在深色模式下变暗 */
.dim-bg {
    filter: brightness(0.5);
}

.article-page {
    position: relative;
    min-height: 100vh;
    color: var(--article-text);
}

.article-container {
    width: 100%;
    min-height: 100vh;
    color: var(--article-text);
    font-family: 'Helvetica Neue', Arial, sans-serif;
    position: relative;
}

/* 添加背景图片样式 */
.bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: -2;
}

/* 为页面添加蒙层以增加文字与背景的对比度 */
.article-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--overlay-gradient);
    z-index: -1;
}

/* 封面图样式 - 减小高度 */
.article-cover {
    height: 40vh;
    min-height: 300px;
    max-height: 450px;
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-radius: 0 0 20px 20px;
    overflow: hidden;
}

.cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.8) 100%);
}

.article-meta-floating {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    padding: 40px 20px;
}

.article-category {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    background-color: rgba(84, 112, 198, 0.7);
    backdrop-filter: blur(10px);
    margin-bottom: 15px;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.6s forwards;
    color: white;
}

.article-title-floating {
    font-size: 2.8rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    width: 80%;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 0.8s forwards 0.3s;
    color: white;
}

/* 文章内容区域 - 添加半透明背景 */
.article-content-wrapper {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    background-color: var(--content-wrapper-bg);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 50px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25),
        0 5px 15px rgba(0, 0, 0, 0.15);
    margin-bottom: 50px;
    transform: translateY(20px);
    opacity: 0;
    animation: fadeInUp 1s forwards 0.6s;
    border: 1px solid var(--card-border);
}

.article-header {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--divider-color);
}

.article-title {
    font-size: 2.4rem;
    font-weight: 700;
    margin: 0 0 25px 0;
    line-height: 1.3;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: var(--title-shadow);
}

.article-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.author-info {
    display: flex;
    align-items: center;
}

.author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid var(--card-border);
}

.author-details {
    display: flex;
    flex-direction: column;
}

.author-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--article-text);
}

.article-date {
    font-size: 14px;
    opacity: 0.7;
    color: var(--article-tertiary);
}

.article-stats {
    display: flex;
    gap: 15px;
}

.stat-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    opacity: 0.8;
    color: var(--article-secondary);
}

.stat-item i {
    margin-right: 6px;
    font-size: 16px;
    color: var(--icon-color);
}

.article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background-color: var(--tag-bg);
    color: var(--tag-text);
    transition: all 0.3s ease;
}

.tag:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-2px);
}

/* 文章内容样式 - 增强对比度 */
.article-content {
    font-size: 16px;
    line-height: 1.8;
    color: var(--article-text);
}

/* 覆盖 Markdown 样式 */
:deep(h1) {
    font-size: 2rem;
    margin: 1.5em 0 0.8em;
    position: relative;
    color: var(--heading-color);
    text-shadow: var(--title-shadow);
}

:deep(h2) {
    font-size: 1.6rem;
    margin: 1.4em 0 0.8em;
    position: relative;
    color: var(--heading-color);
    text-shadow: var(--title-shadow);
}

:deep(h3) {
    font-size: 1.3rem;
    margin: 1.3em 0 0.7em;
    color: var(--heading-color);
}

:deep(h1::after),
:deep(h2::after) {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-color), transparent);
}

:deep(p) {
    margin: 1.2em 0;
    color: var(--article-text);
}

:deep(ul),
:deep(ol) {
    margin: 1em 0;
    padding-left: 1.5em;
    color: var(--article-text);
}

:deep(li) {
    margin-bottom: 0.5em;
}

:deep(code) {
    background-color: var(--code-bg);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 0.9em;
    color: var(--article-secondary);
}

:deep(pre) {
    background-color: var(--code-bg);
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid var(--card-border);
    box-shadow: 0 4px 15px var(--card-shadow);
}

:deep(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    font-size: 0.9em;
    line-height: 1.5;
    color: var(--article-text);
}

:deep(blockquote) {
    margin: 1.5em 0;
    padding: 0.8em 1em 0.8em 1.5em;
    border-left: 4px solid var(--blockquote-border);
    background-color: var(--blockquote-bg);
    border-radius: 0 8px 8px 0;
    color: var(--article-secondary);
}

:deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid var(--card-border);
}

:deep(th),
:deep(td) {
    padding: 0.75em 1em;
    text-align: left;
    border-bottom: 1px solid var(--card-border);
}

:deep(th) {
    background-color: var(--tag-bg);
    font-weight: 600;
    color: var(--article-text);
}

:deep(tr:nth-child(even)) {
    background-color: var(--blockquote-bg);
}

:deep(a) {
    color: var(--accent-color);
    text-decoration: none;
    transition: all 0.2s;
    border-bottom: 1px dashed rgba(122, 146, 230, 0.5);
}

:deep(a:hover) {
    color: var(--btn-hover-bg);
    border-bottom: 1px solid var(--btn-hover-bg);
}

/* 修改后 */
.article-content :deep(img) {
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5em 0;
}

/* 分割线样式 */
.content-divider {
    display: flex;
    align-items: center;
    margin: 50px 0;
}

.content-divider::before,
.content-divider::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: var(--divider-color);
}

.divider-icon {
    margin: 0 15px;
    font-size: 16px;
    color: var(--article-tertiary);
}

/* 评论区域 */
.comments-section {
    padding-top: 20px;
}

.section-title {
    font-size: 1.8rem;
    margin-bottom: 30px;
    position: relative;
    display: inline-block;
    color: var(--heading-color);
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-color), transparent);
}

.comment-input-container {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.comment-avatar {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.comment-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid var(--card-border);
}

.comment-input-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.comment-input {
    width: 100%;
    min-height: 100px;
    padding: 15px;
    background-color: var(--comment-bg);
    border: 1px solid var(--comment-border);
    border-radius: 8px;
    color: var(--article-text);
    font-size: 15px;
    resize: none;
    transition: all 0.3s ease;
    margin-bottom: 10px;
}

.comment-input:focus {
    outline: none;
    background-color: var(--comment-bg);
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(84, 112, 198, 0.3);
}

.comment-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
}

.comment-actions.active {
    height: 40px;
    opacity: 1;
}

.cancel-btn,
.submit-btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
}

.cancel-btn {
    background-color: transparent;
    color: var(--article-tertiary);
}

.cancel-btn:hover {
    color: var(--article-text);
    background-color: var(--comment-bg);
}

.submit-btn {
    background-color: var(--btn-primary-bg);
    color: var(--btn-primary-text);
}

.submit-btn:hover {
    background-color: var(--btn-hover-bg);
    transform: translateY(-2px);
}

.submit-btn:disabled {
    background-color: var(--comment-border);
    cursor: not-allowed;
    transform: none;
    opacity: 0.5;
}

.comments-list {
    margin-top: 30px;
}

.comment-item {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--divider-color);
    transition: all 0.3s ease;
}

.comment-item:hover {
    transform: translateY(-3px);
}

.comment-content {
    flex-grow: 1;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.comment-author {
    font-weight: 600;
    font-size: 15px;
    color: var(--article-text);
}

.comment-date {
    font-size: 13px;
    opacity: 0.7;
    color: var(--article-tertiary);
}

.comment-text {
    margin: 0;
    line-height: 1.6;
    font-size: 15px;
    color: var(--comment-text);
}

.comment-actions-row {
    display: flex;
    gap: 20px;
    margin-top: 12px;
}

.comment-action {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 13px;
    color: var(--article-tertiary);
    transition: all 0.2s ease;
}

.comment-action:hover {
    color: var(--accent-color);
    transform: translateY(-2px);
}

.comment-action i {
    font-size: 14px;
}

.icon-heart.active {
    color: #e91e63;
}

/* 暂无评论提示 */
.no-comments {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    color: var(--article-tertiary);
    text-align: center;
}

.no-comments-icon {
    font-size: 40px;
    margin-bottom: 15px;
    opacity: 0.5;
}

/* 修改操作栏样式 */
.article-actions-bar {
    position: relative;
    width: 100%;
    background-color: var(--actions-bar-bg);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    border: 1px solid var(--actions-bar-border);
    margin: 30px 0;
    padding: 15px 0;
    box-shadow: 0 4px 15px var(--card-shadow);
}

/* 操作栏按钮 */
.action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--article-text);
}

.action-btn:hover {
    transform: translateY(-3px);
}

.action-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--comment-bg);
    border: 1px solid var(--comment-border);
    transition: all 0.3s ease;
}

.action-icon-wrapper:hover {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
    color: white;
}

.action-icon-wrapper.liked {
    background-color: rgba(233, 30, 99, 0.2);
    border-color: rgba(233, 30, 99, 0.5);
    color: #e91e63;
}

/* 调整底部操作栏与文章宽度保持一致 */
.actions-container {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 40px;
}

/* 图标 - 使用背景图片替代文本符号 */
.icon-heart,
.icon-comment,
.icon-bookmark,
.icon-share,
.icon-eye,
.icon-reply,
.icon-arrow-up {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
}

.icon-heart {
    background-image: url('@/assets/icons/heart.png');
}

.icon-comment {
    background-image: url('@/assets/icons/comment.png');
}

.icon-bookmark {
    background-image: url('@/assets/icons/bookmark.png');
}

.icon-share {
    background-image: url('@/assets/icons/share.png');
}

.icon-eye {
    background-image: url('@/assets/icons/eye.png');
}

.icon-reply {
    background-image: url('@/assets/icons/reply.png');
}

.icon-arrow-up {
    background-image: url('@/assets/icons/arrow-up.png');
}

/* 点赞状态的心形图标 */
.icon-heart.active {
    background-image: url('@/assets/icons/heart-filled.png');
}

/* 返回顶部按钮 */
.back-to-top {
    position: fixed;
    bottom: 80px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--accent-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 90;
    box-shadow: 0 5px 15px var(--card-shadow);
    border: 1px solid var(--card-border);
    color: white;
}

.back-to-top:hover {
    background-color: var(--btn-hover-bg);
    transform: translateY(-5px);
}

.back-to-top.show {
    opacity: 1;
    transform: translateY(0);
}

/* 分享弹窗 */
.share-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
}

.share-modal-content {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 30px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px var(--card-shadow);
    transform: scale(0.9);
    animation: scaleIn 0.3s forwards;
    color: var(--article-text);
}

.share-modal h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
    color: var(--heading-color);
}

.share-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 25px;
}

.share-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.share-option:hover {
    transform: translateY(-5px);
}

.share-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
}

.share-icon.wechat {
    background-color: #2DC100;
}

.share-icon.weibo {
    background-color: #E6162D;
}

.share-icon.twitter {
    background-color: #1DA1F2;
}

.share-icon.link {
    background-color: #8E44AD;
}

.share-option span {
    font-size: 13px;
    color: var(--article-text);
}

.close-modal-btn {
    display: block;
    width: 100%;
    padding: 12px;
    border: none;
    background-color: var(--comment-bg);
    color: var(--article-text);
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-modal-btn:hover {
    background-color: var(--accent-color);
    color: white;
}

.home-theme-toggler {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
}

/* 添加摘要样式 */
.article-summary {
    margin: 20px 0;
    padding: 15px 20px;
    background-color: var(--summary-bg);
    border-left: 4px solid var(--accent-color);
    border-radius: 0 8px 8px 0;
    font-size: 16px;
    line-height: 1.6;
    color: var(--article-text);
    font-style: italic;
}

.article-summary p {
    margin: 0;
}

/* 动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
    }

    to {
        transform: scale(1);
    }
}

/* 响应式适配 */
@media (max-width: 960px) {
    .article-content-wrapper {
        padding: 30px;
        max-width: 95%;
    }

    .article-title,
    .article-title-floating {
        font-size: 2rem;
    }

    .share-options {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .article-meta-floating {
        padding: 30px 15px;
    }

    .article-title-floating {
        font-size: 1.8rem;
        width: 100%;
    }

    .article-title {
        font-size: 1.6rem;
    }

    .article-content-wrapper {
        padding: 20px;
    }

    .article-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .article-stats {
        width: 100%;
        justify-content: space-between;
    }

    .actions-container {
        padding: 6px 0;
        gap: 25px;
        /* 在小屏幕上减小间距 */
    }

    .action-icon-wrapper {
        width: 28px;
        height: 28px;
    }

    .home-theme-toggler {
        bottom: 20px;
        left: 20px;
    }

    .article-actions-bar {
        padding: 12px 0;
        margin: 20px 0;
    }
}
</style>