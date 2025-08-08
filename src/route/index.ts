import {createRouter, createWebHistory} from 'vue-router'
import LayoutIndex from '../views/layout/LayoutIndex.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import HomeIndex from "@/views/home/HomeIndex.vue";
import BrandIndex from "../views/brand/BrandIndex.vue";
import EventIndex from "../views/event/EventIndex.vue";

const routes = [
    {
        path: '/',
        component: LayoutIndex,
        children: [
            {
                path: '',
                component: HomeIndex,
            },
            {
                path: '/brand',
                component: BrandIndex,
                meta: {
                    title: 'Fashion Hub - 品牌'
                }
            },
            {
                path: '/event',
                component: EventIndex,
                meta: {
                    title: 'Fashion Hub - 活动',
                }
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: '用户注册'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})



router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})



export default router