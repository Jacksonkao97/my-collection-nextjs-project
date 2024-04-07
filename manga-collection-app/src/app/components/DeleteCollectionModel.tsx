'use client'
import React from 'react'
import Collection from '../model/collectionModel'

interface DeleteCollectionModelProps {
  collection: Collection
}

const DeleteCollectionModel = (props: DeleteCollectionModelProps) => {

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent === 'Yes') {
      await fetch(process.env.COLLECTION_API_URL!, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.collection)
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
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col'>
        <form method="dialog" className='flex flex-col gap-10'>
          <h1>Are you sure you want to delete this Collection {props.collection.name}?</h1>
          <div className='flex flex-row justify-evenly'>
            <button className='btn btn-sm' onClick={handleOnClick}>Yes</button>
            <button className='btn btn-sm' onClick={handleOnClick}>No</button>
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