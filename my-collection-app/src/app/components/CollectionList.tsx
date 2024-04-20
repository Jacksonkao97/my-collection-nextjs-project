'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Third-parties
import { Reorder } from 'framer-motion'
import { toast } from 'sonner'

// Models
import Collection from '../model/collectionModel'

// Components
import CollectionCard from './CollectionCard'

// Actions
import addCollection from '../actions/addCollection'

interface CollectionListProps {
  collections: Collection[]
}

const CollectionList = (props: CollectionListProps) => {
  // The collections that will be displayed
  const [collections, setCollections] = useState<Collection[]>(props.collections)

  // The search value
  const [search, setSearch] = useState<string>('')

  // Function to filter the collections
  const handleOnSearch = (e: HTMLInputElement) => {
    setSearch(e.value)
    const filteredCollections = props.collections.filter(collection => collection.name.toLowerCase().includes(e.value.toLowerCase()))
    setCollections(filteredCollections)
  }

  useEffect(() => {
    setCollections(props.collections)
  }, [props.collections])

  return (
    <div className='flex flex-col w-full min-w-minWidth px-2 gap-2'>
      <div className='flex flex-col gap-2 sm:flex-row justify-center content-center items-center w-full h-fit'>
        <input className='relative rounded-md w-full sm:w-1/3 h-16 bg-transparent hover:bg-base-300 focus:bg-base-300 focus:outline-2 border-b-2 border-black'
          type="text"
          placeholder='Search collection...'
          value={search}
          onChange={(e) => handleOnSearch(e.currentTarget)} />
        <AddCollectionButton />
      </div>
      <Reorder.Group className='flex flex-col w-full gap-4' values={collections} onReorder={setCollections}>
        {collections?.map((collection, index) => (
          Object.keys(collection).length !== 0 ?
            <CollectionCard collection={collection} key={index} /> : null
        ))}
      </Reorder.Group>
    </div>
  )
}

const AddCollectionButton = () => {
  const handleOnCreate = () => {
    const dialog = document.getElementById('create_collection') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <button className="btn btn-lg w-full sm:w-1/3" onClick={handleOnCreate}>Add Collection</button>
      <dialog id="create_collection" className="modal">
        <AddCollectionModel />
      </dialog>
    </div>
  )
}

const AddCollectionModel = () => {
  const [collectionInfo, setCollectionInfo] = useState<{
    image?: File | null,
    imageType?: string | null,
    name: string,
  }>({
    image: null,
    imageType: null,
    name: ''
  })

  const handleOnCreate = async (e: HTMLButtonElement) => {
    if (!collectionInfo.name) {
      toast.warning('Please provide a name for the collection')
      return
    }

    e.disabled = true

    const payload = {
      image: collectionInfo.image ? await base64Encode(collectionInfo.image).then((res) => res[0]) : null,
      imageType: collectionInfo.imageType as string | null,
      name: collectionInfo.name,
    }

    await addCollection(payload)
      .then((res) => {
        if (res) {
          toast.success('Collection created successfully')
        } else {
          toast.error('Failed to create collection')
        }
      })
      .catch(err => {
        toast.error('Failed to connect to the server')
      })
      .finally(() => {
        e.disabled = false
        cleanUp()
        const dialog = document.getElementById('create_collection') as HTMLDialogElement
        dialog.close()
      })
  }

  /**
   * This function will convert the image to base64
   * @param file 
   */
  const base64Encode = async (file: File | null): Promise<[string | ArrayBuffer | null, string | null]> => {
    if (!file) {
      return [null, null]
    }

    const reader = new FileReader()
    reader.readAsDataURL(file as File)

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve([reader.result, file.type])
      }
      reader.onerror = (error) => {
        console.error(error)
        reject([null, null])
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
      setCollectionInfo({
        ...collectionInfo,
        image: null,
        imageType: null,
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.warning('Please select an image file')
      setCollectionInfo({
        ...collectionInfo,
        image: null,
        imageType: null,
      })
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
    const input = document.getElementById('imageInput') as HTMLInputElement
    input.value = ''
    setCollectionInfo({
      image: null,
      imageType: null,
      name: ''
    })
    console.log('form cleaned up')
  }

  return (
    <div className='modal-box w-96 min-h-fit flex flex-col'>
      <form method='dialog' className='w-full h-full flex flex-col gap-4 justify-between'>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
        <label>Image for the collection (Optional):</label>
        <input id='imageInput' type="file" name='image' accept='image/*' onChange={(e) => handleImageChange(e.target)} className="file-input file-input-bordered w-full" />
        {collectionInfo.image && (
          <div className='relative h-[250px] flex flex-col'>
            <p>Selected image:</p>
            <Image
              fill={true}
              style={{ objectFit: 'contain', width: '100%' }}
              src={URL.createObjectURL(collectionInfo.image)}
              alt="Selected" />
          </div>
        )}
        <label>The Collection name (Required):</label>
        <input
          name='name'
          type="text"
          placeholder="Collection Name"
          className="input input-bordered w-full"
          value={collectionInfo.name}
          onChange={(e) => setCollectionInfo({ ...collectionInfo, name: e.target.value })}
        />
        <button className='btn btn-sm' onClick={async (e) => handleOnCreate(e.currentTarget)}>Create</button>
      </form>
    </div>
  )
}

export default CollectionList