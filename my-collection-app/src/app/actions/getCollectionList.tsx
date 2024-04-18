'use server'

// Models
import { FetchCollectionsResponse } from "../model/apiReqResModel"
import Collection from "../model/collectionModel"

const getCollectionList = async () => {
  const collections: Collection[] = await fetch(`${process.env.BASE_URL}/api/collections`, { cache: "no-store" })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data: FetchCollectionsResponse = await res.json()
      return data.collections
    })
    .catch(err => {
      console.error(err.message)
      throw new Error(err.message)
    })

  return collections
}

export default getCollectionList