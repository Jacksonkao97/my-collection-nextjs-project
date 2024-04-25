export interface NewsList {
  news: News[]
}

export interface News {
  date: string,
  id: string,
  title: string,
  url: string,
}