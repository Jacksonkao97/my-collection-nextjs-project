'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface EditItemModelProps {
  itemId: string,
}

const EditItemModel = (props: EditItemModelProps) => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [input, setInput] = useState({ name: '', description: '' })

  const handleOnConfirm = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!input.name && !input.description) {
      alert('Fields cannot be empty')
      e.disabled = false
      return
    } else {
      await fetch(`${process.env.BASE_URL}/api/collections/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: props.itemId, name: input.name, description: input.description })
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
      setInput({ name: '', description: '' })
      const dialog = document.getElementById(`edit_Item_${props.itemId}`) as HTMLDialogElement
      dialog.close()
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setInput({ name: '', description: '' })}>✕</button>
        </form>
        <label>Image for the item:</label>
        <input type="file" className="file-input file-input-bordered w-full" />
        <label>The Item name:</label>
        <input
          type="text"
          placeholder="Item Name"
          className="input input-bordered w-full"
          value={input.name}
          onChange={e => setInput({ ...input, name: e.currentTarget.value })}
        />
        <label>The Item description:</label>
        <input
          type="text"
          placeholder="Item Description"
          className="input input-bordered w-full"
          value={input.description}
          onChange={e => setInput({ ...input, description: e.currentTarget.value })}
        />
        <button className='btn btn-sm' onClick={(e) => handleOnConfirm(e.currentTarget)}>Confirm</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setInput({ name: '', description: '' })}>close</button>
      </form>
    </>
  )
}

export default EditItemModel