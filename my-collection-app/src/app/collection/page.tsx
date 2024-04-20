import React from 'react'

// Models
import CollectionItem from '@/app/model/collectionItemModel'
import { FetchCollectionTableResponse } from '@/app/model/apiReqResModel'

// Components
import CollectionItemTable from '@/app/components/CollectionItemTable'

// Actions
import getCollectionTable from '../actions/getCollectionTable'

interface SearchParams {
  id: string,
}

const Collection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const collectionId = searchParams.id
  const table: CollectionItem[] = await getCollectionTable(collectionId)

  return (
    <CollectionItemTable table={table} />
  )
}

export default Collection