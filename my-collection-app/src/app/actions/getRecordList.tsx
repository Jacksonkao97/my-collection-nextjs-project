'use server'

// Models
import { Record } from "@/app/models/dataType"

const getCollectionTable = async (collectionId: string) => {
  const table: Record[] = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: { records: Record[] } = await res.json()
      return data.records
    })
    .catch(err => {
      console.error(err.message)
      throw new Error('Error fetching collection table')
    })

  return table
}

export default getCollectionTable