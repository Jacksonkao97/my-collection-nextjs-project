import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DeleteCollectionButton from './DeleteCollectionButton'
import NoImageIcon from '../../../public/no-image-svgrepo-com.svg'
import Collection from '../model/collectionModel.d'

interface CollectionCardProps {
  item: Collection
}

const CollectionCard = (props: CollectionCardProps) => {
  return (
    <div className="card w-collection_card h-collection_card glass group focus:ring-2 focus:ring-sky-500" tabIndex={0}>
      <div className='absolute top-5 right-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10 group-focus:opacity-100'>
        <DeleteCollectionButton collection={props.item} />
      </div>
      <figure>
        <Image
          style={{ objectFit: 'contain', position: 'relative', width: '100%', height: '200px' }}
          src={NoImageIcon}
          alt='' />
      </figure>
      <div className="card-body py-2 px-2">
        <h2 className="card-title">{props.item.name}</h2>
        <p>Number of Collections: {props.item.numberOfItems}</p>
        <p>Create Date: {props.item.creationDate}</p>
        <p>Last Updated: {props.item.lastUpdated}</p>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" href={
            {
              pathname: '/my-collection/collection',
              query: { id: props.item.id }
            }
          }>Show Table</Link>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard