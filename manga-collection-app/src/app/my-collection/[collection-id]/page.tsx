import React from 'react'

// Models
import CollectionItem from '@/app/model/collectionItemModel'

// Components
import CollectionItemTable from '@/app/components/CollectionItemTable'

interface searchParams {
  id: string,
}

const Collection = async ({ searchParams }: { searchParams: searchParams }) => {
  const collectionId = searchParams.id
  const collectionTable: CollectionItem[] = await fetch(`${process.env.BASE_URL}/api/collections/${collectionId}`, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
      }
      const data: { data: CollectionItem[] } = await res.json()
      return data.data
    })
    .catch(err => {
      console.error(err.message)
      return [];
    })

  return (
    <CollectionItemTable collectionTable={collectionTable} />
  )
}

export default Collection