export interface FeedItem {
  _id: string
  title: string
  thumbnail: string
}

export interface FeedResponse {
  data: FeedItem[]
  nextPage?: number | null
}
