import { NuxtFireInstance } from '@nuxtjs/firebase'
import { Post, User } from '~/types/entity'
import { PostRepository } from '../post.repository'

export class FirebasePostRepositoryImpl implements PostRepository {
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
          const posts: Post[] = snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as Post)
          )

          const promiseList = posts.map((post) =>
            this.firestore.collection('users').doc(post.uid).get()
          )

          const posters: User[] = (await Promise.all(promiseList)).map(
            (doc) => ({ ...doc.data(), uid: doc.id } as User)
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

  async getByUid(uid: string): Promise<Post[]> {
    try {
      const snapshot = await this.firestore
        .collection('posts')
        .where('uid', '==', uid)
        .orderBy('created_at', 'desc')
        .get()

      return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post))
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
