'use client'
import React from 'react'

// Components
import DeleteItemModel from './DeleteItemModel'

interface DeleteItemButtonProps {
  itemId: string
}

const DeleteItemButton = (props: DeleteItemButtonProps) => {
  const handleOnCreate = () => {
    const dialog = document.getElementById(`delete_Item_${props.itemId}`) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center'>
      <button className="btn btn-sm" onClick={handleOnCreate}>Delete</button>
      <dialog id={`delete_Item_${props.itemId}`} className="modal">
        <DeleteItemModel itemId={props.itemId} />
      </dialog>
    </div>
  )
}

export default DeleteItemButton