import React from 'react'

// Models
import CollectionItem from '@/app/model/collectionItemModel'
import { FetchCollectionTableResponse } from '@/app/model/apiReqResModel'

// Components
import CollectionItemTable from '@/app/components/CollectionItemTable'

interface SearchParams {
  id: string,
}

const Collection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const collectionId = searchParams.id
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

  return (
    <CollectionItemTable table={table} />
  )
}

export default Collection