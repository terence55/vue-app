import { createSimpleMutations, createStateSwitchMutations } from './utils/mutationUtils';
import { CommonActionTypes } from './utils/createMutation';
import { getJsonData } from '../utils/service';
import uris from '../common/uri';

const namespace = 'home';

const mutationTypes = {
  SHOW_TIME: 'SHOW_TIME',
  HIDE_TIME: 'HIDE_TIME',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  SET_REQUEST_DATA: 'SET_REQUEST_DATA'
};

export default {
  namespace,
  state: {
    time: null,
    loading: false,
    requestData: null
  },
  actions: {
    showTime: ({ commit }, input) => commit(mutationTypes.SHOW_TIME, input || new Date().toString()),
    hideTime: ({ commit }) => commit(mutationTypes.HIDE_TIME),
    clearHome: ({ commit }) => commit(CommonActionTypes.CLEAR_STORE),
    asyncPull: ({ commit }) => {
      commit(mutationTypes.START_LOADING);
      getJsonData(uris.doubanInTheaters())
        .then((data) => {
          commit(mutationTypes.SET_REQUEST_DATA, data);
          commit(mutationTypes.STOP_LOADING);
        })
        .catch((err) => {
          commit(mutationTypes.SET_REQUEST_DATA, `Error!!!, detail = ${err}`);
          commit(mutationTypes.STOP_LOADING);
        });
    }
  },
  mutations: {
    ...createSimpleMutations(mutationTypes.SHOW_TIME, 'time'),
    ...createSimpleMutations(mutationTypes.HIDE_TIME, 'time', null),
    ...createStateSwitchMutations(mutationTypes.START_LOADING, mutationTypes.STOP_LOADING, 'loading'),
    ...createSimpleMutations(mutationTypes.SET_REQUEST_DATA, 'requestData')
  },
  getters: {
    evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd')
  }
};
