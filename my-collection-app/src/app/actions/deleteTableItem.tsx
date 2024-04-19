'use server'

import { revalidatePath } from "next/cache"

const deleteTableItem = async ({ collectionId, itemId }: { collectionId: string, itemId: string }) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId: itemId })
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

export default deleteTableItem