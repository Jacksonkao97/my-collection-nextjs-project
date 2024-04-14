import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Components
import DeleteCollectionButton from './DeleteCollectionButton'

// Models
import Collection from '../model/collectionModel.d'

// Assets
import NoImageIcon from '../../../public/no-image-svgrepo-com.svg'

interface CollectionCardProps {
  collection: Collection
}

const CollectionCard = (props: CollectionCardProps) => {
  /**
   * This function will decode the base64 image
   */
  const base64Decode = (base64: string) => {
    try {
      return `data:${props.collection.imageType};base64,${base64}`;
    } catch (error) {
      throw new Error('Error in decoding base64 image')
    }
  }

  return (
    <div className="card w-collection_card h-collection_card glass group focus:ring-2 focus:ring-sky-500" tabIndex={0}>
      <div className='absolute top-5 right-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10 group-focus:opacity-100'>
        <DeleteCollectionButton collectionId={props.collection.id} collectionName={props.collection.name} />
      </div>
      <figure className='relative h-52'>
        <Image
          fill
          priority
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          property='blur'
          blurDataURL={`data:${props.collection.imageType};base64,${props.collection.image}`}
          src={NoImageIcon}
          alt='' />
      </figure>
      <div className="card-body py-2 px-2 justify-between">
        <div className='flex flex-col gap-2'>
          <h2 className="card-title">{props.collection.name}</h2>
          <p>Number of Collections: {props.collection.numberOfItems}</p>
          <p>Create Date: {props.collection.creationDate}</p>
          <p>Last Updated: {props.collection.lastUpdated}</p>
        </div>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" href={
            {
              pathname: '/collection',
              query: { id: props.collection.id }
            }
          } replace>Show Table</Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard