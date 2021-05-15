import { NuxtFireInstance } from '@nuxtjs/firebase'
import { CurrentUser, Post } from '~/types/entity'
import { PostRepository } from '../post.repository'

export class PostRepositoryImpl implements PostRepository {
  private firestore: firebase.default.firestore.Firestore

  constructor(fire: NuxtFireInstance) {
    this.firestore = fire.firestore
  }

  async getList({
    callback,
  }: {
    callback: (posts: Post[]) => void
  }): Promise<void> {
    try {
      this.firestore
        .collection('posts')
        .orderBy('created_at', 'desc')
        .onSnapshot(async (snapshot) => {
          const posts: Post[] = snapshot.docs.map((doc) => doc.data() as Post)
          const promiseList = posts.map((post) =>
            this.firestore.collection('users').doc(post.uid).get()
          )
          const posters: CurrentUser[] = (await Promise.all(promiseList)).map(
            (doc) => doc.data() as CurrentUser
          )
          for (let i = 0; i < posts.length; i++) {
            posts[i].poster = posters[i]
          }

          callback(posts)
        })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async store({ uid, text }: { uid: string; text: string }): Promise<void> {
    try {
      await this.firestore.collection('posts').add({
        text: text,
        uid: uid,
        created_at: new Date().toLocaleString('ja'),
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
