'use client'
import React from 'react'

// Third-party
import { toast } from 'sonner'

interface DeleteCollectionModelProps {
  collectionId: string,
  collectionName: string,
}

const DeleteCollectionModel = (props: DeleteCollectionModelProps) => {
  const handleOnClick = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (e.textContent === 'Yes') {
      await fetch(`${process.env.BASE_URL}/api/collections`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ collectionId: props.collectionId })
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
            toast.error('Server refused to delete collection')
          }
          toast.success('Collection deleted successfully')
        })
        .catch(err => {
          console.error(err.message)
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
          dialog.close()
        })
    } else {
      e.disabled = false
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col'>
        <form method="dialog" className='flex flex-col gap-10'>
          <h1 className='text-ellipsis overflow-hidden'>Delete Collection: {props.collectionName}?</h1>
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

export default DeleteCollectionModel