import { Context } from '@nuxt/types'
import { UserRepositoryImpl } from '~/repositories/firebase/user.repository.impl'
import { UserRepository } from '~/repositories/user.repository'

export default function (
  context: Context,
  inject: (arg0: string, arg1: UserRepository) => void
) {
  const userRepository: UserRepository = new UserRepositoryImpl(context.$fire)
  inject('userRepository', userRepository)
}
