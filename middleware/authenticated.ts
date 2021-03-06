import { Middleware } from '@nuxt/types';

const AuthenticateMiddleware: Middleware = ({ store, redirect }) => {
  if (!store.getters['auth/isLogin']) {
    return redirect('/');
  }
};

export default AuthenticateMiddleware;
