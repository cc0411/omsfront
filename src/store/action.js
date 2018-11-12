import * as types from './mutations-type'


// 提交mutation
function makeAction (type) {
  return ({ commit }, ...args) => commit(type, ...args);
};

export const setInfo = makeAction(types.SET_INFO);
