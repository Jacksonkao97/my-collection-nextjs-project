import React from 'react'
import { revalidatePath } from 'next/cache'

// Models
import Collection from '@/app/model/collectionModel.d'

// Components
import CollectionCard from './components/CollectionCard'
import AddCollectionButton from './components/AddCollectionButton'

interface FetchCollectionsResponse {
  collections: Collection[]
}

export default async function Home() {
  revalidatePath('/', 'page') // revalidate the page every time it is visited
  // Get all collections
  const collections: Collection[] = await fetch(`${process.env.BASE_URL}/api/collections`, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: FetchCollectionsResponse = await res.json()
      return data.collections
    })
    .catch(err => {
      console.error(err.message)
      throw new Error('Error in fetching collections')
    })

  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:min-w-max gap-12 place-items-center'>
        {collections?.map((collection, index) => (
          Object.keys(collection).length !== 0 ?
            <CollectionCard collection={collection} key={index} /> : null
        ))}
        <AddCollectionButton />
      </div>
    </div>
  );
}