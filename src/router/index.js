import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
// 假设你有其它页面组件，比如 About.vue
import About from '../components/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页 - 何东的博客'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            title: '关于我们 - 何东的博客'
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