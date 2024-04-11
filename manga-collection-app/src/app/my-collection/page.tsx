import React from 'react'

// Models
import Collection from '@/app/model/collectionModel.d'

// Components
import CollectionCard from '../components/CollectionCard'
import AddCollectionButton from '../components/AddCollectionButton'

interface FetchCollectionsResponse {
  data: Collection[]
}

const MyCollectionPage = async () => {
  // Get list of collections
  const collections: Collection[] = await fetch(`${process.env.BASE_URL}/api/collections`, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: FetchCollectionsResponse = await res.json()
      return data.data
    })
    .catch(err => {
      console.error(err.message)
      throw new Error('Error in fetching collections')
    })

  return (
    <div className='flex flex-col gap-2 p-4'>
      <h1>My collection</h1>
      <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-12 place-items-center'>
        {collections?.map((collection) => (
          Object.keys(collection).length !== 0 ?
            <CollectionCard item={collection} key={collection.id} /> : null
        ))}
        <AddCollectionButton />
      </div>
    </div>
  )
}

export default MyCollectionPage