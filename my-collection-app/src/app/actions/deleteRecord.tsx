'use server'
import { revalidatePath } from "next/cache"

const deleteRecord = async ({ collectionId, recordId }: { collectionId: string, recordId: string }) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recordId: recordId })
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

export default deleteRecord