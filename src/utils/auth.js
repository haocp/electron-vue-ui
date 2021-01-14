import Cookies from 'js-cookie'
import Store from '@/store'
const TokenKey = 'vue_admin_template_token';

export function getToken() {
    const token = Cookies.get(TokenKey);
    if(token){
        return token;
    }else{
        if(Store){
            return Store.getters.cssToken.get(TokenKey);
        }
    }
}

export function setToken(token) {
    // 存一份token，方便electron使用
    if(Store){
        Store.getters.cssToken.set(TokenKey,token);
    }
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    if(Store){
        Store.getters.cssToken.delete(TokenKey);
    }
    return Cookies.remove(TokenKey)
}
