'use client'
import React from 'react'
import CreateCollectionBox from './CreateCollectionBox'

const AddCollectionButton = () => {

  const handleOnCreate = () => {
    const dialog = document.getElementById('create_collection') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center w-collection_card h-collection_card'>
      <button className="btn btn-lg" onClick={handleOnCreate}>Create Collection</button>
      <dialog id="create_collection" className="modal">
        <CreateCollectionBox />
      </dialog>
    </div>
  )
}

export default AddCollectionButton