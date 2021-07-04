export const state = () => ({
  possiblePrefixes: ['my-favorites', 'old-programs'],
  prefix: '',
  urls: {},
});

export const mutations = {
  // eslint-disable-next-line no-shadow
  setUrls(state, payload) {
    state.prefix = payload.prefix;
    state.urls[payload.prefix] = payload.urls;
  },
};

export const actions = {
  async fetchUrls(context, prefix) {
    const urls = await this.$api.$get(`/dev/contents/${prefix}`);
    context.commit('setUrls', { prefix, urls });
  },
};
