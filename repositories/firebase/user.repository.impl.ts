import { NuxtFireInstance } from '@nuxtjs/firebase';
import { Post, User } from '~/types/entity';
import { UserRepository } from '../user.repository';

export class FirebaseUserRepositoryImpl implements UserRepository {
  private firestore: firebase.default.firestore.Firestore;

  constructor(fire: NuxtFireInstance) {
    this.firestore = fire.firestore;
  }

  async getById(id: string): Promise<User | null> {
    try {
      const doc = await this.firestore.collection('users').doc(id).get();
      if (!doc.exists) return null;

      return doc.data() as User;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getByIdwithPosts(id: string): Promise<User | null> {
    try {
      const doc = await this.firestore.collection('users').doc(id).get();
      if (!doc.exists) return null;

      const posts = (
        await this.firestore
          .collection('posts')
          .where('uid', '==', doc.id)
          .orderBy('created_at', 'desc')
          .get()
      ).docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post));

      return { ...doc.data(), uid: doc.id, posts: posts } as User;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async store({
    uid,
    displayName,
    photoUrl,
  }: {
    displayName: string;
    photoUrl: string;
    uid: string;
  }): Promise<void> {
    try {
      await this.firestore.collection('users').doc(uid).set({
        displayName: displayName,
        photoUrl: photoUrl,
        profile: '',
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateProfile({
    uid,
    profile,
  }: {
    uid: string;
    profile: string;
  }): Promise<void> {
    try {
      await this.firestore
        .collection('users')
        .doc(uid)
        .update({ profile: profile });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
