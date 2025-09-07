import {createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedGeneric} from 'vue-router'
import LayoutIndex from '../views/layout/LayoutIndex.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/register/Register.vue'
import HomeIndex from "../views/home/HomeIndex.vue";
import BrandIndex from "../views/brand/BrandIndex.vue";
import EventIndex from "../views/event/EventIndex.vue";
import CartIndex from "../views/cart/CartIndex.vue";
import ConcreteIndex from "../views/Concrete/ConcreteIndex.vue";
import CommodityIndex from "../views/commodity/CommodityIndex.vue";
import CenterIndex from "../views/profile/CenterIndex.vue";
import UserAddress from "../views/profile/UserAddress.vue";


const routes: any = [
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
                path: 'commodities/:first_cate_id/:id',
                component: CommodityIndex,
            },
            {
                path: 'detail/:id',
                component: ConcreteIndex,
            },
            {
                path: 'center',
                component: CenterIndex,
                children: [
                    {
                        path: '',
                        component: UserInfo,
                    },
                    {
                        path: 'address',
                        component: UserAddress,
                    },
                    {
                        path: 'orders',
                        component: Orders,
                    },
                    {
                        path: 'conf',
                        component: Configuration
                    }
                ]
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


import useUserStore from '../store/userStore.ts'
import UserInfo from "../views/profile/UserInfo.vue";
import Orders from "../views/profile/Orders.vue";
import Configuration from "../views/profile/Configuration.vue";
router.beforeEach((to:RouteLocationNormalizedGeneric, from:RouteLocationNormalizedGeneric, next:NavigationGuardNext) => {


    const userStore = useUserStore()
    if (to.meta.title) {
        (document as any).title = to.meta.title
    }
    // 查询用户是否登陆，已经登陆不能进入/login页面
    if (userStore.isLogin) {
        if (to.path === '/login') {
            next('/')
        }
        else {
            next()
        }
    }
    // 未登陆，放行，很重要，如果不写else，项目启动页面会空白，是否对于某些特定的路由限制由后端来完成
    else {
        next()
    }
})


export default router












