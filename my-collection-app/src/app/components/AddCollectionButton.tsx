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
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <button className="btn btn-lg w-full sm:w-1/3" onClick={handleOnCreate}>Add Collection</button>
      <dialog id="create_collection" className="modal">
        <AddCollectionModel />
      </dialog>
    </div>
  )
}

export default AddCollectionButton