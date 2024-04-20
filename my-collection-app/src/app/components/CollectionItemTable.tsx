'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

// Models
import CollectionItem from '../model/collectionItemModel'

// Actions
import editTableItem from '../actions/editTableItem'
import deleteTableItem from '../actions/deleteTableItem'

// Third-party
import { toast } from 'sonner'

interface CollectionItemTableProps {
  table: CollectionItem[]
}

const CollectionItemTable = (props: CollectionItemTableProps) => {
  const [table, setTable] = useState<CollectionItem[]>(props.table)
  const [search, setSearch] = useState<string>('')

  const handleOnSearch = (e: HTMLInputElement) => {
    setSearch(e.value)
    const filteredTable = props.table.filter(item => item.name.toLowerCase().includes(e.value.toLowerCase()))
    setTable(filteredTable)
  }

  useEffect(() => {
    setTable(props.table)
  }, [props.table])

  return (
    <>
      {table.length === 0 ? <p>No items in collection</p> :
        <div className="overflow-x-auto">
          <table className="table table-pin-cols table-fixed">
            <thead>
              <tr className='w-full'>
                <th className='w-10'></th>
                <th className='w-[250px] truncate'>Name</th>
                <th className='w-[200px] truncate'>Last Update</th>
                <th className='w-max'>Note</th>
                <th className='w-20'></th>
                <th className='w-20'></th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className='truncate'>{item.name}</td>
                    <td>{item.lastUpdated}</td>
                    <td className='truncate'><textarea readOnly className='p-1 rounded-md w-full' rows={1} value={item.description}></textarea></td>
                    <td>
                      <EditItemButton itemId={item.id} />
                    </td>
                    <td>
                      <DeleteItemButton itemId={item.id} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>}
    </>
  )
}

const EditItemButton = ({ itemId }: { itemId: string }) => {
  const handleOnCreate = () => {
    const dialog = document.getElementById(`edit_Item_${itemId}`) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center'>
      <button className="btn btn-sm" onClick={handleOnCreate}>Edit</button>
      <dialog id={`edit_Item_${itemId}`} className="modal">
        <EditItemModel itemId={itemId} />
      </dialog>
    </div>
  )
}

const EditItemModel = ({ itemId }: { itemId: string }) => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [input, setInput] = useState({ name: '', note: '' })

  const handleOnConfirm = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!input.name && !input.note) {
      toast.warning('Please enter the item name or note')
      e.disabled = false
      return
    } else {
      await editTableItem({ collectionId: id!, itemId: itemId, name: input.name, note: input.note })
        .then((res) => {
          if (res) {
            toast.success('Item edited successfully')
          } else {
            toast.error('Server refused to edit item')
          }
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          handleOnClose()
          const dialog = document.getElementById(`edit_Item_${itemId}`) as HTMLDialogElement
          dialog.close()
        })
    }
  }

  const handleOnClose = () => {
    setInput({ name: '', note: '' })
  }

  useEffect(() => {
    textAreaRef.current!.style.height = 'auto'
    textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + 'px'
  }, [input.note])

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6'>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleOnClose}>✕</button>
        </form>
        {/* <label>Image for the item:</label>
        <input type="file" className="file-input file-input-bordered w-full" /> */}
        <label>The Item name:</label>
        <input
          type="text"
          placeholder="Item Name"
          className="input input-bordered w-full"
          value={input.name}
          onChange={e => setInput({ ...input, name: e.currentTarget.value })}
        />
        <label>The Item description:</label>
        <textarea
          ref={textAreaRef}
          rows={1}
          className='p-1 rounded-md'
          placeholder='Write something...'
          value={input.note}
          onChange={e => setInput({ ...input, note: e.currentTarget.value })}></textarea>
        <button className='btn btn-sm' onClick={(e) => handleOnConfirm(e.currentTarget)}>Confirm</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleOnClose}>close</button>
      </form>
    </>
  )
}

const DeleteItemButton = ({ itemId }: { itemId: string }) => {
  const handleOnCreate = () => {
    const dialog = document.getElementById(`delete_Item_${itemId}`) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center content-center'>
      <button className="btn btn-sm" onClick={handleOnCreate}>Delete</button>
      <dialog id={`delete_Item_${itemId}`} className="modal">
        <DeleteItemModel itemId={itemId} />
      </dialog>
    </div>
  )
}

const DeleteItemModel = ({ itemId }: { itemId: string }) => {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const handleOnClick = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (e.textContent === 'Yes') {
      await deleteTableItem({ collectionId: id!, itemId: itemId })
        .then((res) => {
          if (res) {
            toast.success('Item deleted successfully')
          } else {
            toast.error('Server refused to delete item')
          }
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          const dialog = document.getElementById(`delete_Item_${itemId}`) as HTMLDialogElement
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
          <h1>Are you sure you want to delete this item?</h1>
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

export default CollectionItemTable