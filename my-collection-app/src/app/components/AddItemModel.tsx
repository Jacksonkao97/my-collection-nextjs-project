'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Actions
import addTableItem from '../actions/addTableItem'

// Third-party
import { toast } from 'sonner'

const AddItemModel = () => {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [itemName, setItemName] = useState('')

  const handleOnAdd = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!itemName) {
      toast.warning('Please enter the item name')
      e.disabled = false
      return
    } else {
      await addTableItem({ collectionId: id!, name: itemName })
        .then((res) => {
          if (res) {
            toast.success('Item added successfully')
          } else {
            toast.error('Server refused to add item')
          }
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          setItemName('')
          const dialog = document.getElementById('add_item') as HTMLDialogElement
          dialog.close()
        })
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setItemName('')}>✕</button>
        </form>
        {/* <label>Image for the item:</label>
        <input type="file" className="file-input file-input-bordered w-full" /> */}
        <label>The Item name:</label>
        <input
          type="text"
          placeholder="Item Name"
          className="input input-bordered w-full"
          value={itemName}
          onChange={e => setItemName(e.currentTarget.value)}
        />
        <button className='btn btn-sm' onClick={(e) => handleOnAdd(e.currentTarget)}>Add</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setItemName('')}>close</button>
      </form>
    </>
  )
}

export default AddItemModel