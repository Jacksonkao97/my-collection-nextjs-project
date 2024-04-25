'use server'

// Models
import { News, NewsList } from "../models/newsModel"

const getNewsList = async () => {
  try {
    const news: News[] = await fetch(`${process.env.BASE_URL}/api/news`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: NewsList = await res.json()
        return data.news
      })
      .catch(err => {
        throw new Error(err)
      })

    return news;

  } catch (error) {
    console.error(error)
    return [];
  }
}

export default getNewsList