import { defineModel } from '../../core/interface';

import { RootStore } from '../../core/interface';

const Api = {
  getList(data: number) {
    return new Promise<number>((reslove) => {
      setTimeout(() => {
        reslove(data);
      }, 2000);
    });
  },
};
const model = defineModel<RootStore, 'test'>({
  namespace: 'test',
  state: {
    count: 0,
  },
  reducers: {
    updateState(state, data) {
      return { ...state, ...data };
    },
    resetState(state, data) {
      return data;
    },
  },
  actions: {
    async updateCount({ commit, state }, data: number) {
      const count = await Api.getList(state.count + 1);
      commit('updateState', { count });
      return count;
    },

    async resetCount({ commit }) {
      commit('resetState', { count: 0 });
    },
  },
});

export default model;
