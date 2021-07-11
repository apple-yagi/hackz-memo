import { Post, User } from '~/types/entity';
import { PostRepository } from '../post.repository';

export class InMemoryPostRepositoryImpl implements PostRepository {
  getList({ callback }: { callback: (posts: Post[]) => void }): Promise<void> {
    if (!process.client) return Promise.resolve();

    const posts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const postWithPoster = posts.map((post) => {
      const poster = users.find((user) => post.uid === user.uid);
      return { ...post, poster: poster };
    });
    return Promise.resolve(callback(postWithPoster));
  }

  getByUid(uid: string): Promise<Post[]> {
    if (!process.client) return Promise.resolve([]);
    const posts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');

    const filterPosts = posts.filter((post) => post.uid === uid);
    return Promise.resolve(filterPosts);
  }

  store({ uid, text }: { uid: string; text: string }): Promise<void> {
    if (!process.client) return Promise.resolve();
    const posts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');

    posts.unshift({
      id: `${posts.length + 1}`,
      text: text,
      uid: uid,
      created_at: new Date().toLocaleString('ja'),
    });

    localStorage.setItem('posts', JSON.stringify(posts));
    return Promise.resolve();
  }
}
