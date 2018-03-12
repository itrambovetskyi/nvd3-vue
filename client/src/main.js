// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueNVD3 from 'vue-nvd3';

import App from './App';

Vue.config.productionTip = false;

Vue.use(VueNVD3);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
});
