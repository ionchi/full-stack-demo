import { userService } from '~/_services';

export default {
  async getUserData({ commit }) {
    try {
      const user = await userService.getUserProfile();
      commit('SET_USER', user);
    } catch (e) {
      console.log(e);
    }
  },

  async login({ commit, dispatch }, { email, password }) {
    try {
      await userService.login(email, password);
      await dispatch('getUserData');
    } catch (e) {
      let errorMessage = '';
      if (e.response && (e.response.status === 401 || e.response.status === 403 || e.response.status === 500)) {
        errorMessage = 'The username or password you entered is incorrect.';
      } else {
        errorMessage = 'An error occurred... Retry later';
      }
      this.$toast.global.api_error({ message: errorMessage });
    }
  },

  logout({ commit }) {
    commit('SET_USER', null);
    userService.logout();
  }
};
