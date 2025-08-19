import {createRouter, createWebHistory} from 'vue-router'
import LayoutIndex from '../views/layout/LayoutIndex.vue'
import Login from '@/views/login/Login.vue'
import Register from '@/views/register/Register.vue'
import HomeIndex from "@/views/home/HomeIndex.vue";
import BrandIndex from "../views/brand/BrandIndex.vue";
import EventIndex from "../views/event/EventIndex.vue";
import CartIndex from "../views/cart/CartIndex.vue";
import ConcreteIndex from "../views/Concrete/ConcreteIndex.vue";
import CommodityIndex from "../views/commodity/CommodityIndex.vue";


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
                path: 'brand',
                component: BrandIndex,
                meta: {
                    title: 'Fashion Hub - 品牌'
                }
            },
            {
                path: 'event',
                component: EventIndex,
                meta: {
                    title: 'Fashion Hub - 活动',
                }
            },
            {
                path: 'cart',
                component: CartIndex,
                meta: {
                    title: '我的购物车',
                }
            },
            {
                path: 'commodities/:id',
                component: CommodityIndex,
            },
            {
                path: 'detail/:id',
                component: ConcreteIndex,
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
    scrollBehavior() {
        return {
            top: 0,
        }
    }
})



router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})



export default router