import { Post, User } from '~/types/entity';
import { UserRepository } from '../user.repository';

export class InMemoryUserRepositoryImpl implements UserRepository {
  getById(id: string): Promise<User | null> {
    if (!process.client) return Promise.resolve(null);
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const findUser = users.find((user) => user.uid === id);
    if (!findUser) {
      return Promise.resolve(null);
    }
    return Promise.resolve(findUser);
  }

  getByIdwithPosts(id: string): Promise<User | null> {
    if (!process.client) return Promise.resolve(null);
    const posts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const findUser = users.find((user) => user.uid === id);
    if (!findUser) {
      return Promise.resolve(null);
    }

    findUser.posts = posts.filter((post) => post.uid === findUser?.uid);
    return Promise.resolve(findUser);
  }

  store({
    uid,
    displayName,
    photoUrl,
  }: {
    displayName: string;
    photoUrl: string;
    uid: string;
  }): Promise<void> {
    if (!process.client) return Promise.resolve();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    users.unshift({
      uid: uid,
      displayName: displayName,
      photoUrl: photoUrl,
      profile: '',
    } as User);

    localStorage.setItem('users', JSON.stringify(users));
    return Promise.resolve();
  }

  updateProfile({
    uid,
    profile,
  }: {
    uid: string;
    profile: string;
  }): Promise<void> {
    if (!process.client) return Promise.resolve();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const findIndex = users.findIndex((user) => user.uid === uid);
    if (findIndex === -1) {
      return Promise.reject('Not found user!');
    }

    users[findIndex].profile = profile;
    localStorage.setItem('users', JSON.stringify(users));
    return Promise.resolve();
  }
}
