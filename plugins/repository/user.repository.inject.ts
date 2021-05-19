import { Context } from '@nuxt/types'
import { FirebaseUserRepositoryImpl } from '~/repositories/firebase/user.repository.impl'
import { InMemoryUserRepositoryImpl } from '~/repositories/inmemory/user.repository.impl'
import { UserRepository } from '~/repositories/user.repository'

export default function (
  context: Context,
  inject: (arg0: string, arg1: UserRepository) => void
) {
  let userRepository: UserRepository | null = null
  switch (process.env.NODE_ENV) {
    case 'inmemory':
      userRepository = new InMemoryUserRepositoryImpl()
      break
    default:
      userRepository = new FirebaseUserRepositoryImpl(context.$fire)
  }
  inject('userRepository', userRepository)
}
