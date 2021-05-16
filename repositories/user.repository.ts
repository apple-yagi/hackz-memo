import { User } from '~/types/entity'

export interface UserRepository {
  getById: (id: string) => Promise<User | null>
  getByIdwithPosts: (id: string) => Promise<User | null>
  store: ({
    uid,
    displayName,
    photoUrl,
  }: {
    uid: string
    displayName: string
    photoUrl: string
  }) => Promise<void>
  updateProfile: ({
    uid,
    profile,
  }: {
    uid: string
    profile: string
  }) => Promise<void>
}
