import Vue from "vue";
import Router from "vue-router";
import Layout from '@/layout';

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: (resolve) => require(['@/views/redirect'], resolve)
            }
        ]
    },
    {
        path: "/login",
        hidden: true,
        component: () => import('@/views/login'),
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [{
            path: 'index',
            name: '首页',
            component: ()=> import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard',noCache: true, affix: true }
        }]
    },
    {
        path: '/404',
        component: (resolve) => require(['@/views/error/404'], resolve),
        hidden: true
    },
    {
        path: '/401',
        component: (resolve) => require(['@/views/error/401'], resolve),
        hidden: true
    },
    {
        path: '/echart',
        name: '数据可视化',
        component: (resolve) => require(['@/views/echarts/index.vue'], resolve)
    }
];

const router = new Router({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    // 切换菜单组件。页面回到顶部
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace (location) {
    return originalReplace.call(this, location).catch(err => err)
}

export default router;