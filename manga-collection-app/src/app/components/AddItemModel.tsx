'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const AddItemModel = () => {

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [itemName, setItemName] = useState('')

  const handleOnAdd = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!itemName) {
      alert('Please enter the item name')
      e.disabled = false
      return
    } else {
      await fetch(`${process.env.BASE_URL}/api/collections/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: itemName })
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err.message)
          alert('Error in adding new item')
        })
        .finally(() => {
          e.disabled = false
        })
      setItemName('')
      const dialog = document.getElementById('add_item') as HTMLDialogElement
      dialog.close()
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