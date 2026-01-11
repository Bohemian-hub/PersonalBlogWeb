import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Research from '../views/Research.vue'
import Studio from '../views/Studio.vue'
import Play from '../views/Play.vue'
import Article from '../views/Article.vue'
import Manage from '../views/Manage.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页 - HeDong的博客'
        }
    },
    {
        path: '/research',
        name: 'Research',
        component: Research,
        meta: {
            title: '我的文章 - HeDong的博客'
        }
    },
    {
        path: '/studio',
        name: 'Studio',
        component: Studio,
        meta: {
            title: '我的项目 - HeDong的博客'
        }
    },
    {
        path: '/play',
        name: 'Play',
        component: Play,
        meta: {
            title: '朋友圈 - HeDong的博客'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: '关于我 - HeDong的博客'
        }
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage,
        meta: {
            title: '管理'
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: Article,
        meta: {
            title: '文章'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '页面不存在 - HeDong的博客'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})

// 全局路由守卫，根据路由 meta 中的 title 修改文档标题
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router