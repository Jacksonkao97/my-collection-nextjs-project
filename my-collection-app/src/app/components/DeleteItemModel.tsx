'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

// Third-party
import { toast } from 'sonner'

interface DeleteItemModelProps {
  itemId: string,
}

const DeleteItemModel = (props: DeleteItemModelProps) => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const handleOnClick = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (e.textContent === 'Yes') {
      await fetch(`${process.env.BASE_URL}/api/collections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: props.itemId })
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
            toast.error('Server refused to delete collection')
          }
          toast.success('Collection deleted successfully')
          const dialog = document.getElementById(`delete_Item_${props.itemId}`) as HTMLDialogElement
          dialog.close()
        })
        .catch(err => {
          console.error(err.message)
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
        })
    } else {
      e.disabled = false
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col'>
        <form method="dialog" className='flex flex-col gap-10'>
          <h1>Are you sure you want to delete this item?</h1>
          <div className='flex flex-row justify-evenly'>
            <button className='btn btn-sm' onClick={(e) => handleOnClick(e.currentTarget)}>Yes</button>
            <button className='btn btn-sm' onClick={(e) => handleOnClick(e.currentTarget)}>No</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  )
}

export default DeleteItemModel