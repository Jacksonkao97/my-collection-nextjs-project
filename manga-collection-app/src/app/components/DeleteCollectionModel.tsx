'use client'
import React from 'react'

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
            throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err.message)
          alert('Failed to delete collection')
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
          <h1>Are you sure you want to delete this Collection {props.collectionName}?</h1>
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