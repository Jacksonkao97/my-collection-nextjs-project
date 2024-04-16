import React from 'react'

// Models
import Collection from '@/app/model/collectionModel.d'
import { FetchCollectionsResponse } from './model/apiReqResModel'

// Components
import CollectionList from './components/CollectionList'

export default async function Home() {
  // Get all collections
  const collections: Collection[] = await fetch(`${process.env.BASE_URL}/api/collections`, { cache: 'no-cache' })
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

  return (
    <div className='flex flex-col gap-2'>
      <CollectionList collections={collections} />
    </div>
  );
}