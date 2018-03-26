import Vue from 'vue';
import Vuex from 'vuex';
import createEnhancedMutation from './createMutation';

Vue.use(Vuex);

const context = require.context('../', false, /\.js$/);
const keys = context.keys().filter(item => (item !== './index.js'));
const stores = [];
for (let i = 0; i < keys.length; i++) {
  stores.push(context(keys[i]));
}

const rootStore = { modules: {}, strict: true };
stores.forEach((store) => {
  const model = store.default || store;
  const mod = {
    namespaced: true,
    state: model.state,
    mutations: createEnhancedMutation(model.state, model.mutations),
    actions: model.actions,
    getters: model.getters
  };
  if (model.namespace) {
    rootStore.modules[model.namespace] = mod;
  }
});

const store = new Vuex.Store(rootStore);

export default store;
