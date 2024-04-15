'use client'
import React, { useState } from 'react'
import Image from 'next/image'

// third-party
import { toast } from 'sonner'

interface CollectionInfo {
  image?: File | null,
  imageType?: string | null,
  name: string,
}

const AddCollectionModel = () => {
  const [collectionInfo, setCollectionInfo] = useState({
    image: null,
    imageType: null,
    name: ''
  } as CollectionInfo)

  /**
   * This function will send a POST request to the server to create a new collection
   * @param e 
   */
  const handleOnCreate = async (e: (HTMLButtonElement)) => {
    e.disabled = true

    if (!collectionInfo.name) {
      toast.warning('Please enter the collection name')
      e.disabled = false
      return
    }

    try {
      var image = null

      if (collectionInfo.image) {
        image = await base64Encode(collectionInfo.image)
      }

      const payload = {
        image: image as string | null,
        imageType: collectionInfo.imageType,
        name: collectionInfo.name,
      }

      await fetch(`${process.env.BASE_URL}/api/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error(`HTTP error! status: ${res.status}`)
            toast.error('Server refused to create collection')
          }
          toast.success('Collection created successfully')
          cleanUp()
          const dialog = document.getElementById('create_collection') as HTMLDialogElement
          dialog.close()
        })
        .catch(err => {
          console.error(err.message)
          toast.error('Connection error in creating collection')
        })
        .finally(() => {
          e.disabled = false
        })
    } catch (error) {
      e.disabled = false
      console.error(error)
      toast.error('Failed to create collection')
    }
  }

  /**
   * This function will convert the image to base64
   * @param file 
   */
  const base64Encode = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
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
      toast.warning('Please select an image file')
      return
    }

    setCollectionInfo({
      ...collectionInfo,
      image: file,
      imageType: file.type,
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
      <div className='modal-box w-80 md:w-96 flex flex-col gap-4'>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
        </form>
        <label>Image for the collection (Optional):</label>
        <input type="file" accept='image/*' onChange={(e) => handleImageChange(e.target)} className="file-input file-input-bordered w-full" />
        {collectionInfo.image && (
          <div className='relative h-60'>
            <p>Selected image:</p>
            <Image
              fill={true}
              style={{ objectFit: 'contain', width: '100%' }}
              src={URL.createObjectURL(collectionInfo.image)}
              alt="Selected" />
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