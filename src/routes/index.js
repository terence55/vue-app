import Vue from 'vue';
import Router from 'vue-router';
import Home from './home';

Vue.use(Router);

const context = require.context('./', true, /^\.\/((?!\/)[\s\S])+\/index\.js$/);
const keys = context.keys();
const children = [];
for (let i = 0; i < keys.length; i++) {
  children.push(context(keys[i]).default || context(keys[i]));
}

const routes = children.map(route => ({
  path: route.path,
  name: route.name,
  component: route.component
}));

export default new Router({
  mode: 'hash',
  base: __dirname,
  routes: [{
    path: '/',
    name: 'Index',
    component: Home.component
  },
  ...routes,
  { path: '*', redirect: '/' }
  ]
});
