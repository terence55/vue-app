export function createSimpleMutations(actionType, key, value) {
  return {
    [actionType]: (state, payload) => {
      state[key] = value || payload;
    }
  };
}

export function createStateSwitchMutations(positiveActionType, negativeActionType, key) {
  return {
    [positiveActionType]: (state) => {
      state[key] = true;
    },
    [negativeActionType]: (state) => {
      state[key] = false;
    }
  };
}
