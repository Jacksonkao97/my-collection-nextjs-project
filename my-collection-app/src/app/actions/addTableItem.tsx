'use server'

import { revalidatePath } from "next/cache"

const addTableItem = async ({ collectionId, name }: { collectionId: string, name: string }) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
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

export default addTableItem