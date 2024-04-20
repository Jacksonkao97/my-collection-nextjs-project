'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Third-parties
import { Reorder } from 'framer-motion'
import { toast } from 'sonner'

// Models
import Collection from '../model/collectionModel.d'

// Actions
import deleteCollection from '../actions/deleteCollection'

// Assets
import NoImageIcon from '../../../public/no-image-svgrepo-com.svg'
import DeleteIcon from '../../../public/delete.png'

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
          priority
          style={{ objectFit: 'cover' }}
          src={props.collection.image ? props.collection.image : NoImageIcon}
          alt='collection Image' />
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

const DeleteCollectionButton = (props: { collectionId: string, collectionName: string }) => {
  const handleOnDelete = () => {
    const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
    dialog.showModal()
  }
  return (
    <>
      <Image
        className='w-8 h-8 object-contain cursor-pointer bg-red-500 rounded-md p-1 hover:bg-red-600 transition duration-300 ease-in-out'
        src={DeleteIcon}
        alt='Delete Collection'
        onClick={handleOnDelete}
      />
      <dialog id={`delete_collection_${props.collectionId}`} className="modal" key={props.collectionId}>
        <DeleteCollectionModel collectionId={props.collectionId} collectionName={props.collectionName} />
      </dialog>
    </>
  )
}

const DeleteCollectionModel = (props: { collectionId: string, collectionName: string }) => {
  const handleOnClick = async (e: HTMLButtonElement) => {
    if (e.textContent === 'Yes') {
      e.disabled = true
      await deleteCollection(props.collectionId)
        .then((res) => {
          if (!res) {
            toast.error('Server refused to delete collection')
          }
          toast.success('Collection deleted successfully')
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
          dialog.close()
        })
    } else {
      const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
      dialog.close()
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col'>
        <form method="dialog" className='flex flex-col gap-10'>
          <h1 className='text-ellipsis overflow-hidden'>Delete Collection: {props.collectionName}?</h1>
          <div className='flex flex-row justify-evenly'>
            <button className='btn btn-sm' onClick={(e) => handleOnClick(e.currentTarget)}>Yes</button>
            <button className='btn btn-sm' onClick={(e) => handleOnClick(e.currentTarget)}>No</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  )
}

export default CollectionCard