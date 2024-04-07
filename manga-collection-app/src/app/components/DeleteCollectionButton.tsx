'use client'
import React from 'react'
import Image from 'next/image'
import DeleteIcon from '../../../public/delete.png'
import Collection from '../model/collectionModel'
import DeleteCollectionModel from './DeleteCollectionModel'

interface DeleteCollectionButtonProps {
  collection: Collection
}

const DeleteCollectionButton = (props: DeleteCollectionButtonProps) => {

  const handleOnDelete = () => {
    const dialog = document.getElementById('delete_collection_'+props.collection.id) as HTMLDialogElement
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
      <dialog id={`delete_collection_${props.collection.id}`} className="modal" key={props.collection.id}>
        <DeleteCollectionModel collection={props.collection} />
      </dialog>
    </>
  )
}

export default DeleteCollectionButton