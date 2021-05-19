import { Context } from '@nuxt/types'
import { FirebasePostRepositoryImpl } from '~/repositories/firebase/post.repository.impl'
import { InMemoryPostRepositoryImpl } from '~/repositories/inmemory/post.repository.impl'
import { PostRepository } from '~/repositories/post.repository'

export default function (
  context: Context,
  inject: (arg0: string, arg1: PostRepository) => void
) {
  let postRepository: PostRepository | null = null
  switch (process.env.NODE_ENV) {
    case 'inmemory':
      postRepository = new InMemoryPostRepositoryImpl()
      break
    default:
      postRepository = new FirebasePostRepositoryImpl(context.$fire)
  }
  inject('postRepository', postRepository)
}
