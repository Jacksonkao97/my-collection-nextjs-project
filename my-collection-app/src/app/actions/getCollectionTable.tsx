'use server'

// Models
import CollectionItem from "../model/collectionItemModel"
import { FetchCollectionTableResponse } from "../model/apiReqResModel"

const getCollectionTable = async (collectionId: string) => {
  const table: CollectionItem[] = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: FetchCollectionTableResponse = await res.json()
      return data.collectionTable
    })
    .catch(err => {
      console.error(err.message)
      throw new Error('Error fetching collection table')
    })

  return table
}

export default getCollectionTable