'use server'
import { revalidatePath } from "next/cache"

interface EditRecordProps {
  collectionId: String,
  recordId: String,
  episode?: Number,
  season?: Number,
  note?: String,
}

const editRecord = async (props: EditRecordProps) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${props.collectionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recordId: props.recordId, episode: props.episode, season: props.season, note: props.note})
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

export default editRecord