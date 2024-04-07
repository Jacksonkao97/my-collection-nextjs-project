import React from 'react'
import CollectionCard from '../components/CollectionCard'
import Collection from '@/app/model/collectionModel.d'
import AddCollectionButton from '../components/AddCollectionButton'

type CollectionResponse = {
  data: Collection[]
}

const MyCollectionPage = async () => {

  // Get collections from the server
  const collections: Collection[] = await fetch(process.env.COLLECTION_API_URL!, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: CollectionResponse = await res.json()
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