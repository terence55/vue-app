import { createSimpleMutations, createStateSwitchMutations } from './utils/mutationUtils';
import { getJsonData } from '../utils/service';
import uris from '../common/uri';

const namespace = 'user';

const mutationTypes = {
  SET_USER_LIST: 'SET_USER_LIST',
  SET_USER: 'SET_USER',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING'
};

export default {
  namespace,
  state: {
    userList: null,
    user: null,
    loading: false
  },
  actions: {
    getUserList({ commit }) {
      commit(mutationTypes.START_LOADING);
      getJsonData(uris.getUserList())
        .then((data) => {
          commit(mutationTypes.SET_USER_LIST, data);
          commit(mutationTypes.STOP_LOADING);
        })
        .catch((err) => {
          commit(mutationTypes.SET_USER_LIST, `Error!!!, detail = ${err}`);
          commit(mutationTypes.STOP_LOADING);
        });
    },
    getUser({ commit }) {
      commit(mutationTypes.START_LOADING);
      getJsonData(uris.getUser(new Date().getMilliseconds()))
        .then((data) => {
          commit(mutationTypes.SET_USER, data);
          commit(mutationTypes.STOP_LOADING);
        })
        .catch((err) => {
          commit(mutationTypes.SET_USER, `Error!!!, detail = ${err}`);
          commit(mutationTypes.STOP_LOADING);
        });
    }
  },
  mutations: {
    ...createSimpleMutations(mutationTypes.SET_USER_LIST, 'userList'),
    ...createSimpleMutations(mutationTypes.SET_USER, 'user'),
    ...createStateSwitchMutations(mutationTypes.START_LOADING, mutationTypes.STOP_LOADING, 'loading')
  }
};
