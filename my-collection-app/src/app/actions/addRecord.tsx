'use server'
import { revalidatePath } from "next/cache"

interface recordProps {
  collectionId: string,
  title: string,
  type: string,
  episode?: Number,
  season?: Number,
  note?: string,
}

const addRecord = async (props: recordProps) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${props.collectionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: props.title,
      type: props.type,
      episode: props.episode,
      season: props.season,
      note: props.note
    })
  })
    .then(async (res) => {
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
        return false
      }
      revalidatePath('/')
      return true
    })
    .catch(err => {
      console.error(err.message)
      return false
    })
  return response
}

export default addRecord