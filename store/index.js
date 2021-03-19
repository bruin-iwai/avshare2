/* eslint-disable no-shadow */
import axios from '~/plugins/axios';

export const state = () => ({
  possiblePrefixes: ['my-favorites', 'old-programs'],
  prefix: '',
  urls: {},
});

export const mutations = {
  setUrls(state, payload) {
    state.prefix = payload.prefix;
    state.urls[payload.prefix] = payload.urls;
  },
};

export const actions = {
  async fetchUrls(context, prefix) {
    const { data } = await axios.get(`/dev/contents/${prefix}`);
    context.commit('setUrls', { prefix, urls: data });
  },
};
