'use client'
import Image from "next/image"
import { toast } from "sonner"

// Actions
import deleteCollection from "@/app/actions/deleteCollection"

// Assets
import DeleteIcon from '@/app/assets/delete.svg'

const DeleteCollectionBtn = (props: { collectionId: string, collectionName: string }) => {
  const handleOnDelete = () => {
    const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
    dialog.showModal()
  }
  return (
    <>
      <Image
        className='w-8 h-8 object-contain cursor-pointer bg-red-500 rounded-md p-1 hover:bg-red-600 transition duration-300 ease-in-out'
        src={DeleteIcon}
        alt='Delete Collection'
        onClick={handleOnDelete}
      />
      <dialog id={`delete_collection_${props.collectionId}`} className="modal" key={props.collectionId}>
        <DeleteCollectionModel collectionId={props.collectionId} collectionName={props.collectionName} />
      </dialog>
    </>
  )
}

export default DeleteCollectionBtn

const DeleteCollectionModel = (props: { collectionId: string, collectionName: string }) => {
  const handleOnClick = async (e: HTMLButtonElement) => {
    if (e.textContent === 'Yes') {
      e.disabled = true
      await deleteCollection(props.collectionId)
        .then((res) => {
          if (!res) {
            toast.error('Server refused to delete collection')
            return
          }
          toast.success('Collection deleted successfully')
          return
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
          return
        })
        .finally(() => {
          e.disabled = false
          const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
          dialog.close()
        })
    } else {
      const dialog = document.getElementById('delete_collection_' + props.collectionId) as HTMLDialogElement
      dialog.close()
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