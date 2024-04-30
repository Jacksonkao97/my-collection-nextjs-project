'use server'
import { revalidatePath } from "next/cache"

const deleteCollection = async (collectionId: string) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ collectionId: collectionId })
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

export default deleteCollection