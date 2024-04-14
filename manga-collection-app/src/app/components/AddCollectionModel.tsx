'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface CollectionInfo {
  image?: File | null,
  name: string,
}

const AddCollectionModel = () => {
  const [collectionInfo, setCollectionInfo] = useState({} as CollectionInfo)

  /**
   * This function will send a POST request to the server to create a new collection
   * @param e 
   */
  const handleOnCreate = async (e: (HTMLButtonElement)) => {
    e.disabled = true

    if (!collectionInfo) {
      alert('Please fill the collection name')
      e.disabled = false
      return
    }

    await fetch(`${process.env.BASE_URL}/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collectionInfo)
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
        }
        alert('Collection created successfully')
        cleanUp()
        const dialog = document.getElementById('create_collection') as HTMLDialogElement
        dialog.close()
      })
      .catch(err => {
        console.error(err.message)
        alert('Error in creating collection')
      })
  }

  /**
   * Get the file and validate it as an image
   * @param e 
   */
  const handleImageChange = (e: (EventTarget & HTMLInputElement)) => {
    const file = e.files![0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setCollectionInfo({
      ...collectionInfo,
      image: file
    })
  }

  /**
   * Clean up the collection info
   */
  const cleanUp = () => {
    setCollectionInfo({
      image: null,
      name: ''
    })
    console.log('cleaned up')
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
        </form>
        <label>Image for the collection (Optional):</label>
        <input type="file" accept='image/*' onChange={(e) => handleImageChange(e.target)} className="file-input file-input-bordered w-full" />
        {collectionInfo.image && (
          <div>
            <p>Selected image:</p>
            <Image src={URL.createObjectURL(collectionInfo.image)} width={300} height={300} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
        )}
        <label>The Collection name:</label>
        <input
          type="text"
          placeholder="Collection Name"
          className="input input-bordered w-full"
          value={collectionInfo.name}
          onChange={(e) => setCollectionInfo({ ...collectionInfo, name: e.target.value })}
        />
        <button className='btn btn-sm' onClick={(e) => handleOnCreate(e.currentTarget)}>Create</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanUp}>close</button>
      </form>
    </>
  )
}

export default AddCollectionModel