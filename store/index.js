export const state = () => ({
  possiblePrefixes: ['my-favorites', 'old-programs'],
  prefix: '',
  urls: {},
  loading: false,
});

export const mutations = {
  setUrls(state, payload) {
    state.prefix = payload.prefix;
    state.urls[payload.prefix] = payload.urls;
  },
  setLoading(state) {
    state.loading = true;
  },
  resetLoading(state) {
    state.loading = false;
  },
};

export const actions = {
  async fetchUrls(context, prefix) {
    const urls = await this.$api.$get(`/dev/contents/${prefix}`);
    context.commit('setUrls', { prefix, urls });
  },
};

export const getters = {
  urls(state) {
    return state.urls[state.prefix];
  },
};
