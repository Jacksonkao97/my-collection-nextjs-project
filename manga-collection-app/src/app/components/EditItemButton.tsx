'use client'
import React from 'react'

// Components
import EditItemModel from './EditItemModel'

interface EditItemButtonProps {
  itemId: string
}

const EditItemButton = (props: EditItemButtonProps) => {
  const handleOnCreate = () => {
    const dialog = document.getElementById(`edit_Item_${props.itemId}`) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center'>
      <button className="btn btn-sm" onClick={handleOnCreate}>Edit</button>
      <dialog id={`edit_Item_${props.itemId}`} className="modal">
        <EditItemModel itemId={props.itemId} />
      </dialog>
    </div>
  )
}

export default EditItemButton