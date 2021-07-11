import { posts } from './data/posts';
import { users } from './data/users';

export default function () {
  if (localStorage.getItem('users') === null) {
    const usersStringify = JSON.stringify(users);
    localStorage.setItem('users', usersStringify);
  }

  if (localStorage.getItem('posts') === null) {
    const postsStringify = JSON.stringify(posts);
    localStorage.setItem('posts', postsStringify);
  }
}
