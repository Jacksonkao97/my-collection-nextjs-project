'use server'

import { revalidatePath } from "next/cache"

interface EditItemProps {
  id: String,
  title?: String,
  type?: String,
  episode?: Number,
  season?: Number,
  country?: String,
  image?: String,
  author?: String,
  url?: String,
  date?: String,
}

const editItem = async (props: EditItemProps) => {
  const updatingItem = await fetch(`${process.env.BASE_URL}/api/items`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId: props.id, title: props.title, type: props.type, episode: props.episode, season: props.season, country: props.country, image: props.image, author: props.author, url: props.url, date: props.date })
  })
    .then(async (res) => {
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
        return false
      }
      revalidatePath('/item')
      return true
    })
    .catch(err => {
      console.error(err.message)
      return false
    })

  return updatingItem
}

export default editItem