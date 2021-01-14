import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/common.scss' // 全局统用css
// ali图标
import '@/assets/icons'; // icon
import '@/styles/index.scss';
import '@/config/permission';
// 数据可视化组件
import dataV from '@jiaminghi/data-view'

Vue.use(Element);
Vue.use(dataV);

// 前端分页封装
import Pagination from "@/components/Pagination";
//自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"
// 全局组件挂载
Vue.component('Pagination', Pagination);
Vue.component('RightToolbar', RightToolbar);

import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, handleTree } from "@/utils/common";
// 全局方法挂载
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
