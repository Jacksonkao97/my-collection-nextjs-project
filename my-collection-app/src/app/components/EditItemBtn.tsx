'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Models
import { Item } from '@/app/models/dataType'

// Actions
import editItem from '@/app/actions/editItem'

// Third party
import { toast } from 'sonner'

interface EditItemBtnProps {
  item: Item
}

// MARK: - EditItemBtn
const EditItemBtn = (props: EditItemBtnProps) => {
  const handleOnEdit = () => {
    const dialog = document.getElementById(`edit_item_btn_${props.item.id}`) as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <>
      <button onClick={handleOnEdit} className='absolute btn right-3 bottom-3'>
        <h1>Edit</h1>
      </button>
      <dialog id={`edit_item_btn_${props.item.id}`} className="modal" key={props.item.id}>
        <EditItemModel item={props.item} />
      </dialog>
    </>
  )
}

export default EditItemBtn

// MARK: - EditItemModel
const EditItemModel = ({ item }: { item: Item }) => {
  const [itemInfo, setItemInfo] = useState<
    {
      id: string,
      title: string,
      type: string,
      episode: number,
      season: number,
      image?: string | undefined | File | null,
      imageType?: string | undefined | null,
    }>({
      id: item.id,
      title: item.title,
      type: item.type,
      episode: item.episode,
      season: item.season,
      image: null,
      imageType: null,
    })

  const handleOnEdit = async (e: HTMLButtonElement) => {
    e.disabled = true

    const payload = {
      id: itemInfo.id,
      title: itemInfo.title,
      type: itemInfo.type,
      episode: itemInfo.episode,
      season: itemInfo.season,
      image: itemInfo.image ? await base64Encode(itemInfo.image as File).then((res) => res[0] as string) : undefined,
      imageType: itemInfo.imageType as string | undefined,
    }

    await editItem(payload)
      .then((res) => {
        if (res) {
          toast.success('Item edited successfully')
          location.reload()
        } else {
          toast.error('Failed to edit item')
          e.disabled = false
        }
      })
      .catch((err) => {
        toast.error('Failed to edit item')
        e.disabled = false
      })
      .finally(() => {
        e.disabled = false
        const dialog = document.getElementById(`edit_item_btn_${item.id}`) as HTMLDialogElement
        dialog.close()
      })
  }

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

  const handleImageChange = (e: (EventTarget & HTMLInputElement)) => {
    const file = e.files![0]

    if (!file) {
      setItemInfo({
        ...itemInfo,
        image: undefined,
        imageType: undefined,
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.warning('Please select an image file')
      setItemInfo({
        ...itemInfo,
        image: undefined,
        imageType: undefined,
      })
      return
    }

    setItemInfo({
      ...itemInfo,
      image: file,
      imageType: file.type,
    })
  }

  const cleanUp = () => {
    setItemInfo({
      id: item.id,
      title: item.title,
      type: item.type,
      episode: item.episode,
      season: item.season,
      image: undefined,
      imageType: undefined,
    })
  }

  return (
    <>
      <div className='modal-box w-[400px] flex flex-col gap-4 sm:w-[640px] sm:max-w-none sm:flex-row'>
        <label>Item info:</label>
        <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs cursor-pointer" onChange={(e) => handleImageChange(e.target)} />
        {itemInfo.image && (
          <div className='relative h-[250px] flex flex-col'>
            <p>Selected image:</p>
            <Image
              fill={true}
              style={{ objectFit: 'contain', width: '100%' }}
              src={URL.createObjectURL(itemInfo.image as File)}
              alt="Selected" />
          </div>
        )}
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
          value={itemInfo.title}
          onChange={e => setItemInfo({ ...itemInfo, title: e.currentTarget.value })}
        />
        <select className="select select-bordered focus:outline-0 select-sm w-full max-w-xs" onChange={e => setItemInfo({ ...itemInfo, type: e.currentTarget.value })} value={itemInfo.type}>
          <option>Book</option>
          <option>Drama</option>
          <option>Movie</option>
          <option>Others</option>
        </select>
        <input
          type="number"
          placeholder="Episode"
          className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
          min={0}
          onKeyDown={(event) => {
            const key = event.key;
            if (key === '-' || key === '+' || key === 'e' || key === 'E') {
              event.preventDefault();
            }
          }}
          value={itemInfo.episode || 0}
          onChange={e => setItemInfo({ ...itemInfo, episode: parseFloat(e.currentTarget.value) })}
        />
        <input
          type="number"
          placeholder="Season"
          className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
          min={0}
          onKeyDown={(event) => {
            const key = event.key;
            if (key === '-' || key === '+' || key === 'e' || key === 'E') {
              event.preventDefault();
            }
          }}
          value={itemInfo.season || 0}
          onChange={e => setItemInfo({ ...itemInfo, season: parseInt(e.currentTarget.value) })}
        />
        <button className='btn btn-sm' onClick={(e) => handleOnEdit(e.currentTarget)}>Edit</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanUp}>close</button>
      </form>
    </>
  )
}