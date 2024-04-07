'use client'
import React, { useState } from 'react'

const AddCollectionBox = () => {
  const [collectionName, setCollectionName] = useState('' as string)

  const postCollection = async () => {
    try {
      const body = {
        name: collectionName
      }
      await fetch(process.env.COLLECTION_API_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
          }
        })
        .catch(err => {
          console.error(err.message)
          throw new Error('Error in creating new collection')
        })

    } catch (error) {
      console.error("Error in creating new collection", error)
      throw new Error('Error in creating new collection')
    }
  }

  const handleOnCreate = async () => {
    if (collectionName === '') {
      alert('Collection name cannot be empty')
      return
    } else {
      await postCollection()
        .then(() => {
          setCollectionName('')
          const dialog = document.getElementById('create_collection') as HTMLDialogElement
          dialog.close()
        })
        .catch(() => {
          alert('Error in creating collection')
        })
    }
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6'>
        <label>Image for the collection:</label>
        <input type="file" className="file-input file-input-bordered w-full" />
        <label>The Collection name:</label>
        <input
          type="text"
          placeholder="Collection Name"
          className="input input-bordered w-full"
          value={collectionName}
          onChange={e => setCollectionName(e.currentTarget.value)}
        />
        <button className='btn btn-sm' onClick={handleOnCreate}>Create</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setCollectionName('')}>close</button>
      </form>
    </>
  )
}

export default AddCollectionBox