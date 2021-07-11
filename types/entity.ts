export type User = {
  uid: string;
  displayName: string;
  photoUrl: string;
  profile?: string;
  posts?: Post[];
};

export type Post = {
  id?: string;
  text: string;
  created_at: string;
  uid: string;
  poster?: User;
};
