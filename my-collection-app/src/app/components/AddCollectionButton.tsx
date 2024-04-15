'use client'
import React from 'react'

// Components
import AddCollectionModel from './AddCollectionModel'

const AddCollectionButton = () => {
  const handleOnCreate = () => {
    const dialog = document.getElementById('create_collection') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center w-collection_card h-collection_card'>
      <button className="btn btn-lg" onClick={handleOnCreate}>Add Collection</button>
      <dialog id="create_collection" className="modal">
        <AddCollectionModel />
      </dialog>
    </div>
  )
}

export default AddCollectionButton