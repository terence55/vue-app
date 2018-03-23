// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import routes from './routes';
import models from './models/utils/combineStore';
import { init, collectResource } from './utils/localeUtils';

init(collectResource(require.context('./locale', false, /\.js$/)));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routes,
  store: models,
  components: { App },
  template: '<App/>'
});
