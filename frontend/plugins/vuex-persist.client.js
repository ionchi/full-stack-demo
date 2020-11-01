import VuexPersistence from 'vuex-persist/dist/umd';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'vuex',
      storage: window.localStorage,
      modules: ['user']
    }).plugin(store);
  });
};
