import { getUser } from '~/_helpers';

export default function({ store, req }) {
  // If nuxt generate, pass this middleware
  if (process.server && !req) { return; }
  const loggedUser = !process.server ? getUser() : null;
  if (loggedUser) {
    store.commit('user/SET_USER', loggedUser);
  }
}
