import { Post } from '~/types/entity'

export interface PostRepository {
  getList: ({
    callback,
  }: {
    callback: (posts: Post[]) => void
  }) => Promise<void>
  store: ({ uid, text }: { uid: string; text: string }) => Promise<void>
}
