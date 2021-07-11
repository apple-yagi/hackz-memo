import { UserRepository } from '~/repositories/user.repository';
import { PostRepository } from '~/repositories/post.repository';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $userRepository: UserRepository;
    readonly $postRepository: PostRepository;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $userRepository: UserRepository;
    $postRepository: PostRepository;
  }
  interface Context {
    $userRepository: UserRepository;
    $postRepository: PostRepository;
  }
}

declare module 'vuex' {
  interface Store<S> {
    $userRepository: UserRepository;
    $postRepository: PostRepository;
  }
}
