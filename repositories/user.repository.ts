import { CurrentUser } from '~/types/entity'

export interface UserRepository {
  getById: (id: string) => Promise<CurrentUser | null>
  store: (currentUser: CurrentUser) => Promise<void>
}
