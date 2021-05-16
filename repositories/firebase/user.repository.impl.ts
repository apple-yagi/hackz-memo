import { NuxtFireInstance } from '@nuxtjs/firebase'
import { CurrentUser } from '~/types/entity'
import { UserRepository } from '../user.repository'

export class UserRepositoryImpl implements UserRepository {
  private firestore: firebase.default.firestore.Firestore

  constructor(fire: NuxtFireInstance) {
    this.firestore = fire.firestore
  }

  async getById(id: string): Promise<CurrentUser | null> {
    try {
      const doc = await this.firestore.collection('users').doc(id).get()
      if (!doc.exists) return null

      return doc.data() as CurrentUser
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async store(currentUser: CurrentUser): Promise<void> {
    try {
      await this.firestore.collection('users').doc(currentUser.uid).set({
        displayName: currentUser.displayName,
        photoUrl: currentUser.photoUrl,
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
