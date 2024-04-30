'use server'

// Models
import { Collection } from "@/app/models/dataType"

const getCollectionList = async () => {
  const collections = await fetch(`${process.env.BASE_URL}/api/collections`, {cache: "no-store"})
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data: { collections: Collection[] } = await res.json()
      return data.collections
    })
    .catch(err => {
      console.error(err.message)
      throw new Error(err.message)
    })

  return collections
}

export default getCollectionList