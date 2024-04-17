import React from 'react'

// Models
import Collection from '@/app/model/collectionModel.d'

// Components
import CollectionList from './components/CollectionList'

// actions
import getCollectionList from './actions/getCollectionList'

export default async function Home() {
  const collections: Collection[] = await getCollectionList()

  return (
    <div className='flex flex-col gap-2'>
      <CollectionList collections={collections} />
    </div>
  );
}