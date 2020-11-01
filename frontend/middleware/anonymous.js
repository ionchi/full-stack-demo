export default function({ store, redirect }) {
  if (store.getters['user/IS_AUTHENTICATED']) {
    return redirect('/dashboard');
  }
}
