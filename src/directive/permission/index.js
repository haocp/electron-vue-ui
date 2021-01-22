import hasRole from './hasRole'
import hasPermi from './hasPermi'

const install = function(Vue) {
  // 全局注册指令
  Vue.directive('hasRole', hasRole)
  Vue.directive('hasPermi', hasPermi)
}

if (window.Vue) {
  window['hasRole'] = hasRole
  window['hasPermi'] = hasPermi
  Vue.use(install); // eslint-disable-line
}

export default install
