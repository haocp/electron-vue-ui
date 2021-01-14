import router from '../router'
import store from '../store'
import {Message} from 'element-ui'
// 进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie

NProgress.configure({showSpinner: false});// NProgress Configuration
const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 获取token
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done();
        } else {
            if (store.getters.roles.length === 0) {
                // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => {
                    // 拉取user_info
                    const roles = res.roles;
                    // 组装路由菜单
                    store.dispatch('GenerateRoutes').then(accessedRoutes =>{
                        router.addRoutes(accessedRoutes); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
                    })
                })
                    .catch(err => {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error(err);
                            next({ path: '/login' })
                        })
                    })
            }
            next();
        }
    } else {
        // 只要确定当页面是登录页面的钩子就不让他循环下去
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
})
