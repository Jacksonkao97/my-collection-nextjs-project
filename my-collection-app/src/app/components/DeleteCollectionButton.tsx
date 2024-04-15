'use client'
import React from 'react'
import Image from 'next/image'

// Components
import DeleteCollectionModel from './DeleteCollectionModel'

// Assets
import DeleteIcon from '../../../public/delete.png'

interface DeleteCollectionButtonProps {
  collectionId: string,
  collectionName: string,
}

const DeleteCollectionButton = (props: DeleteCollectionButtonProps) => {
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

export default DeleteCollectionButton