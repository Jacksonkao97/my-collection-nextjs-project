'use client'
import React, { useState } from 'react'

// Third-parties
import { Reorder } from 'framer-motion'

// Models
import Collection from '../model/collectionModel'

// Components
import AddCollectionButton from './AddCollectionButton'
import CollectionCard from './CollectionCard'

interface CollectionListProps {
  collections: Collection[]
}

const CollectionList = (props: CollectionListProps) => {
  const [collections, setCollections] = useState<Collection[]>(props.collections)
  const [currentCollection, setCurrentCollection] = useState<Collection[]>(collections)

  const [search, setSearch] = useState<string>('')
  const handleOnSearch = (e: HTMLInputElement) => {
    setSearch(e.value)
    const filteredCollections = collections.filter(collection => collection.name.toLowerCase().includes(e.value.toLowerCase()))
    setCurrentCollection(filteredCollections)
  }

  return (
    <div className='flex flex-col w-full min-w-minWidth px-2 gap-2'>
      <div className='flex flex-col gap-2 sm:flex-row justify-center content-center items-center w-full h-fit'>
        <input className='relative rounded-md w-full sm:w-1/3 h-16 bg-transparent hover:bg-base-300 focus:bg-base-300 focus:outline-2 border-b-2 border-black'
          type="text"
          placeholder='Search collection...'
          value={search}
          onChange={(e) => handleOnSearch(e.currentTarget)} />
        <AddCollectionButton />
      </div>
      <Reorder.Group className='flex flex-col w-full gap-4' values={currentCollection} onReorder={setCollections}>
        {currentCollection?.map((collection, index) => (
          Object.keys(collection).length !== 0 ?
            <CollectionCard collection={collection} key={index} /> : null
        ))}
      </Reorder.Group>
    </div>
  )
}

export default CollectionList