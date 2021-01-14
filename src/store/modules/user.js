import {login, logout, getInfo,getHello} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user ={
    state: {
        token: getToken(),
        name: 'Super Admin',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: [],
        permissions: [],
        cssToken:new Map()
    },
    mutations:{
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions
        }
    },
    actions:{


        // user login
        Login({commit}, userInfo) {
            const {username, password} = userInfo;
            return new Promise((resolve, reject) => {
                login(username.trim(), password).then(response => {
                    console.log("登录返回："+ response.token);
                    commit('SET_TOKEN', response.token);
                    setToken(response.token);
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            //commit('SET_NAME', "Super Admin")
            //commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
            return new Promise((resolve, reject) => {
                console.log("请求user信息:"+state.token);
                getInfo(state.token).then(res => {
                    const user = res.user;
                    // 获取头像
                    const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles);
                        commit('SET_PERMISSIONS', res.permissions);
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT']);
                    }
                    commit('SET_NAME', user.userName);
                    commit('SET_AVATAR', avatar);
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    commit('SET_PERMISSIONS', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        },

        test({commit,state}){
            return new Promise(resolve => {
                getHello(state.token).then(res=>{
                    resolve(res)
                }).catch(error=>{
                    resolve(error);
                })

            })
        }
    }
}

export default user;

