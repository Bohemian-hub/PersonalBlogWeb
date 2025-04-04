import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Research from '../views/Research.vue'
import Studio from '../views/Studio.vue'
import Play from '../views/Play.vue'
import Feel from '../views/Feel.vue'
import Say from '../views/Say.vue'
import Record from '../views/Record.vue'

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
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: '关于我 - HeDong的博客'
        }
    },
    {
        path: '/research',
        name: 'Research',
        component: Research,
        meta: {
            title: '学术札记 - HeDong的博客'
        }
    },
    {
        path: '/studio',
        name: 'Studio',
        component: Studio,
        meta: {
            title: '实践工坊 - HeDong的博客'
        }
    },
    {
        path: '/play',
        name: 'Play',
        component: Play,
        meta: {
            title: '游民时代 - HeDong的博客'
        }
    },
    {
        path: '/feel',
        name: 'Feel',
        component: Feel,
        meta: {
            title: '认知轨迹 - HeDong的博客'
        }
    },
    {
        path: '/say',
        name: 'Say',
        component: Say,
        meta: {
            title: '互动集市 - HeDong的博客'
        }
    },
    {
        path: '/record',
        name: 'Record',
        component: Record,
        meta: {
            title: '新建记录'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 全局路由守卫，根据路由 meta 中的 title 修改文档标题
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router