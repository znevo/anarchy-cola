import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './css/main.scss';

Vue.config.productionTip = false;

import Metamask from './library/MetaMask';
const metamask = new Metamask();
window.metamask = metamask;

metamask.on('EVENT_ACCOUNT_CONNECTED',    () => { window.location.reload() });
metamask.on('EVENT_ACCOUNT_SWITCHED',     () => { window.location.reload() });
metamask.on('EVENT_ACCOUNT_DISCONNECTED', () => { window.location.reload() });
metamask.on('EVENT_CHAIN_SWITCHED',       () => { window.location.reload() });

import Anarchy from './Anarchy';
const anarchy = new Anarchy();
Vue.prototype.$anarchy = anarchy;
window.anarchy = anarchy;

(async() => {
  await metamask.init();
  await anarchy.init();

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})();
