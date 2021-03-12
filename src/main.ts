import Vue from 'vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(VueGtag, {
    config: { id: 'G-720EQN3LQN' },
});

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
