'use client'
import { useState } from "react"
import Image from "next/image"

// Third Party
import { toast } from "sonner"

// Actions
import addCollection from "@/app/actions/addCollection"

const CreateCollectionBtn = () => {
  const handleOnCreate = () => {
    const dialog = document.getElementById('create_collection') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="btn w-[65px] h-[65px]" onClick={handleOnCreate}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <dialog id="create_collection" className="modal">
        <CreateCollectionModel />
      </dialog>
    </div>
  )
}

export default CreateCollectionBtn

const CreateCollectionModel = () => {
  const [collectionInfo, setCollectionInfo] = useState<{
    title: string,
    image?: File | null,
    imageType?: string | null,
    note?: string,
  }>({
    title: '',
    image: null,
    imageType: null,
    note: ''
  })

  const handleOnCreate = async (e: HTMLButtonElement) => {
    if (!collectionInfo.title) {
      toast.warning('Please provide a name for the collection')
      return
    }

    e.disabled = true

    const payload = {
      title: collectionInfo.title,
      image: collectionInfo.image ? await base64Encode(collectionInfo.image).then((res) => res[0]) : null,
      imageType: collectionInfo.imageType as string | null,
      note: collectionInfo.note,
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
      title: '',
      image: null,
      imageType: null,
      note: ''
    })
  }

  return (
    <>
      <div className='modal-box w-[400px] flex flex-col gap-4 sm:w-[640px] sm:max-w-none sm:flex-row'>
        <form method='dialog' className='w-full flex flex-col gap-2 justify-center sm:w-1/2'>
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
        </form>
        <form method='dialog' className='w-full flex flex-col gap-2 justify-center sm:w-1/2'>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
          <label>The Collection name (Required):</label>
          <input
            name='name'
            type="text"
            placeholder="Collection Name"
            className="input input-bordered w-full"
            value={collectionInfo.title}
            onChange={(e) => setCollectionInfo({ ...collectionInfo, title: e.target.value })}
          />
          <label>Description (Optional):</label>
          <input
            name='description'
            type="text"
            placeholder="Description..."
            className="input input-bordered w-full"
            value={collectionInfo.note}
            onChange={(e) => setCollectionInfo({ ...collectionInfo, note: e.target.value })}
          />
          <button className='btn btn-sm' onClick={async (e) => handleOnCreate(e.currentTarget)}>Create</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanUp}>close</button>
      </form>
    </>
  )
}