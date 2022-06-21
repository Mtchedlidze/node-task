export interface IArticle {
  id: string
  title: string
  slug: string
  published_at: Date | null
  userID: string
  isPrivate: boolean
}
