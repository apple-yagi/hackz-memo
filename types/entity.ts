export interface CurrentUser {
  uid: string
  displayName: string
  photoUrl: string
}

export interface Post {
  id?: string
  text: string
  created_at: string
  uid: string
  poster?: CurrentUser
}
