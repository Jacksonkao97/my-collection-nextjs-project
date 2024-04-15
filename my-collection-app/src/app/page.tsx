import React, { useState } from 'react'

// Models
import Collection from '@/app/model/collectionModel.d'
import { FetchCollectionsResponse } from './model/apiReqResModel'

// Components
import CollectionCard from './components/CollectionCard'
import AddCollectionButton from './components/AddCollectionButton'

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
    <div className='flex flex-col gap-2 p-4'>
      <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-12 place-items-center'>
        {collections?.map((collection, index) => (
          Object.keys(collection).length !== 0 ?
            <CollectionCard collection={collection} key={index} /> : null
        ))}
        <AddCollectionButton />
      </div>
    </div>
  );
}