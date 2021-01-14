import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        tagsView,
        permission
    },
    getters:{
        sidebar: state => state.app.sidebar,
        device: state => state.app.device,
        token: state => state.user.token,
        avatar: state => state.user.avatar,
        name: state => state.user.name,
        cssToken:state => state.user.cssToken,
        roles: state => state.user.roles,
        permissions: state => state.user.permissions,
        visitedViews: state => state.tagsView.visitedViews,
        cachedViews: state => state.tagsView.cachedViews,
        permission_routes: state => state.permission.routes
    }
})

export default store;
