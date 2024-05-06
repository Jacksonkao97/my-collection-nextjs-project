'use client'
import Image from 'next/image'

// Assets
import DeleteIcon from '@/app/assets/delete.svg'

// Actions
import deleteItem from '@/app/actions/deleteItem'

// Third Party
import { toast } from 'sonner'

interface DeleteItemBtnProps {
  itemId: string,
}

// MARK: - DeleteItemBtn
const DeleteItemBtn = (props: DeleteItemBtnProps) => {
  const handleOnDelete = () => {
    const dialog = document.getElementById('delete_item_' + props.itemId) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <>
      <Image
        className='w-8 h-8 object-contain cursor-pointer bg-red-500 rounded-md p-1 hover:bg-red-600 transition duration-300 ease-in-out'
        src={DeleteIcon}
        alt='Delete Item'
        onClick={handleOnDelete}
      />
      <dialog id={`delete_item_${props.itemId}`} className="modal" key={props.itemId}>
        <DeleteItemModel itemId={props.itemId} />
      </dialog>
    </>
  )
}

export default DeleteItemBtn

// MARK: - DeleteItemModel
const DeleteItemModel = (props: { itemId: string }) => {
  const handleOnClick = async (e: HTMLButtonElement) => {
    if (e.textContent === 'Yes') {
      e.disabled = true
      await deleteItem(props.itemId)
        .then((res) => {
          if (!res) {
            toast.error('Server refused to delete item')
            return
          }
          toast.success('Item deleted successfully')
          return
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
          return
        })
        .finally(() => {
          e.disabled = false
          const dialog = document.getElementById('delete_item_' + props.itemId) as HTMLDialogElement
          dialog.close()
        })
    } else {
      const dialog = document.getElementById('delete_item_' + props.itemId) as HTMLDialogElement
      dialog.close()
    }
  }

  return (
    <>
      <div className="modal-box w-80 md:w-96 flex flex-col">
        <form method="dialog" className='flex flex-col gap-10'>
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={(e) => handleOnClick(e.target as HTMLButtonElement)}
            >
              Yes
            </button>
            <button
              className="btn btn-primary"
              onClick={(e) => handleOnClick(e.target as HTMLButtonElement)}
            >
              No
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  )
}