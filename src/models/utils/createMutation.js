export const CommonActionTypes = {
  CLEAR_STORE: 'common/CLEAR_STORE',
  SET_VIA_PATH: 'common/SET_VIA_PATH'
};

export default function createEnhancedMutation(initialState, handlers) {
  const copyOfInitialState = { ...initialState };
  const extraHandlers = {
    [`${CommonActionTypes.CLEAR_STORE}`]: (state) => {
      Object.keys(copyOfInitialState).forEach((key) => { state[key] = copyOfInitialState[key]; });
    },
    [`${CommonActionTypes.SET_VIA_PATH}`]: (state, payload) => {
      if (!payload || typeof payload !== 'object') {
        return;
      }
      Object.keys(payload).forEach((key) => { state[key] = payload[key]; });
    }
  };
  const enhancedReducer = { ...handlers, ...extraHandlers };
  return enhancedReducer;
}
