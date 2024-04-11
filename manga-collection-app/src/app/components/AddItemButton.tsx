'use client'
import React from 'react'

// Components
import AddItemModel from './AddItemModel'

const AddItemButton = () => {

  const handleOnAddItem = () => {
    const dialog = document.getElementById('add_item') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <>
      <div>
        <button className='btn btn-primary' onClick={handleOnAddItem}>Add Item</button>
      </div>
      <dialog id="add_item" className="modal">
        <AddItemModel />
      </dialog>
    </>
  )
}

export default AddItemButton