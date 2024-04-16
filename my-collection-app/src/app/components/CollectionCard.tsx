'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Third-parties
import { Reorder } from 'framer-motion'

// Components
import DeleteCollectionButton from './DeleteCollectionButton'

// Models
import Collection from '../model/collectionModel.d'

// Assets
import NoImageIcon from '../../../public/no-image-svgrepo-com.svg'
import yourName from '../../../public/你的名字 .jpg'

interface CollectionCardProps {
  collection: Collection
}

const CollectionCard = (props: CollectionCardProps) => {
  const newCreateDate = new Date(props.collection.creationDate)
  const dateString = `${newCreateDate.getFullYear()}-${(newCreateDate.getMonth() + 1).toString().padStart(2, '0')}-${newCreateDate.getDate().toString().padStart(2, '0')}
  \n ${newCreateDate.getHours().toString().padStart(2, '0')}:${newCreateDate.getMinutes().toString().padStart(2, '0')}:${newCreateDate.getSeconds().toString().padStart(2, '0')}`;
  const newUpdateDate = new Date(props.collection.lastUpdated)
  const updateDateString = `${newUpdateDate.getFullYear()}-${(newUpdateDate.getMonth() + 1).toString().padStart(2, '0')}-${newUpdateDate.getDate().toString().padStart(2, '0')}
  \n ${newUpdateDate.getHours().toString().padStart(2, '0')}:${newUpdateDate.getMinutes().toString().padStart(2, '0')}:${newUpdateDate.getSeconds().toString().padStart(2, '0')}`;

  return (
    <div className="card w-auto h-[450px] bg-base-300 shadow-xl group focus:ring-2 focus:ring-sky-500 sm:customCardSM" tabIndex={0}>
      <figure className='relative min-w-96 h-full'>
        <Image
          fill
          style={{ objectFit: 'cover' }}
          src={yourName}
          alt='' />
      </figure>
      <div className="card-body w-full py-2 px-2 justify-between sm:w-32">
        <div className='flex flex-col gap-2'>
          <h2 className="text-2xl truncate">{props.collection.name}</h2>
          <p>Number of Collections: {props.collection.numberOfItems}</p>
          <p>Create Date: {dateString}</p>
          <p>Last Updated: {updateDateString}</p>
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
      <div className='absolute top-5 right-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10 group-focus:opacity-100'>
        <DeleteCollectionButton collectionId={props.collection.id} collectionName={props.collection.name} />
      </div>
    </div>
  )
}

export default CollectionCard