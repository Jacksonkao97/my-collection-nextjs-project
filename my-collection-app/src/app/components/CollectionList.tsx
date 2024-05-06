'use client'
import { useState, useEffect } from 'react'

// Components
import CollectionCard from '@/app/components/CollectionCard'

// Models
import { Collection } from '@/app/models/dataType'

interface CollectionListProps {
  collections: Collection[],
}

const CollectionList = (props: CollectionListProps) => {
  const [collections, setCollections] = useState<Collection[]>(props.collections)
  const [search, setSearch] = useState<string>('')
  const handleOnSearch = (e: HTMLInputElement) => {
    setSearch(e.value)
    const filteredCollections = props.collections.filter(collection => collection.title.toLowerCase().includes(e.value.toLowerCase()))
    setCollections(filteredCollections)
  }

  useEffect(() => {
    setCollections(props.collections)
  }, [props.collections])

  return (
    <div className="relative flex flex-col w-full gap-7 bg-base-200 p-2">
      <h1 className='text-2xl'>Collection List:</h1>
      <input className='relative rounded-box w-full h-[40px] sm:absolute sm:w-[250px] top-[5px] right-[5px] bg-transparent hover:bg-base-300 focus:bg-base-300 focus:outline-2 border-b-2 border-black p-2'
        type="text"
        placeholder='Search collection...'
        value={search}
        onChange={(e) => handleOnSearch(e.currentTarget)} />
      <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {collections.map((collection, index) => (
          <CollectionCard collection={collection} key={index} />
        ))}
      </div>
    </div>
  )
}

export default CollectionList