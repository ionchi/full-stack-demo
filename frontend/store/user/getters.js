export default {
  /**
   * @return {boolean}
   */
  IS_AUTHENTICATED(state) {
    return !!(state.user);
  },
  LOGGED_USER(state) {
    return state.user;
  }
};
