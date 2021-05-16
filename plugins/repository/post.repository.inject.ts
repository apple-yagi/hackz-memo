import { Context } from '@nuxt/types'
import { PostRepositoryImpl } from '~/repositories/firebase/post.repository.impl'
import { PostRepository } from '~/repositories/post.repository'

export default function (
  context: Context,
  inject: (arg0: string, arg1: PostRepository) => void
) {
  const postRepository: PostRepository = new PostRepositoryImpl(context.$fire)
  inject('postRepository', postRepository)
}
