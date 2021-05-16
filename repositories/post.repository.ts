import { Post } from '~/types/entity'

export interface PostRepository {
  getList: ({
    callback,
  }: {
    callback: (posts: Post[]) => void
  }) => Promise<void>
  getByUid: (uid: string) => Promise<Post[]>
  store: ({ uid, text }: { uid: string; text: string }) => Promise<void>
}
