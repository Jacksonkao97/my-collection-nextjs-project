'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

// Third-party
import { toast } from 'sonner'

// Actions
import addRecord from '@/app/actions/addRecord'

const CreateRecordBtn = () => {
  const handleOnAddRecord = () => {
    const dialog = document.getElementById('add_record') as HTMLDialogElement
    dialog.showModal()
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="btn w-[65px] h-[65px]" onClick={handleOnAddRecord}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <dialog id="add_record" className="modal">
        <AddItemModel />
      </dialog>
    </div>
  )
}

export default CreateRecordBtn

const AddItemModel = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [recordInfo, setRecordInfo] = useState({ title: '', type: '', episode: 0, season: 0, note: '' })

  const handleOnAdd = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!recordInfo.title && !recordInfo.type) {
      toast.warning('Record title and type are required')
      e.disabled = false
      return
    } else {
      await addRecord({ collectionId: id!, title: recordInfo.title, type: recordInfo.type, episode: recordInfo.episode, season: recordInfo.season, note: recordInfo.note })
        .then((res) => {
          if (res) {
            toast.success('Item added successfully')
          } else {
            toast.error('Server refused to add item')
          }
        })
        .catch(err => {
          toast.error('Connection error, please try again later')
        })
        .finally(() => {
          e.disabled = false
          cleanUp()
          const dialog = document.getElementById('add_record') as HTMLDialogElement
          dialog.close()
        })
    }
  }

  const cleanUp = () => {
    setRecordInfo({ title: '', type: '', episode: 0, season: 0, note: '' })
  }

  return (
    <>
      <div className='modal-box w-[400px] flex flex-col gap-4 sm:w-[640px] sm:max-w-none sm:flex-row'>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
        </form>
        <div className='w-1/2'></div>
        <div className='w-1/2 flex flex-col gap-1'>
          <label>The Record info:</label>
          <input
            type="text"
            placeholder="Record Title"
            className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
            value={recordInfo.title}
            onChange={e => setRecordInfo({ ...recordInfo, title: e.currentTarget.value })}
          />
          <select className="select select-bordered focus:outline-0 select-sm w-full max-w-xs" onChange={e => setRecordInfo({ ...recordInfo, type: e.currentTarget.value })} value={recordInfo.type}>
            <option>Book</option>
            <option>Drama</option>
            <option>Movie</option>
            <option>Others</option>
          </select>
          <input
            type="number"
            placeholder="Episode (Optional)"
            className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
            min={0}
            onKeyDown={(event) => {
              const key = event.key;
              if (key === '-' || key === '+' || key === 'e' || key === 'E') {
                event.preventDefault();
              }
            }}
            onChange={e => setRecordInfo({ ...recordInfo, episode: parseFloat(e.currentTarget.value) })}
          />
          <input
            type="number"
            placeholder="Season (Optional)"
            className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
            min={0}
            onKeyDown={(event) => {
              const key = event.key;
              if (key === '-' || key === '+' || key === 'e' || key === 'E') {
                event.preventDefault();
              }
            }}
            onChange={e => setRecordInfo({ ...recordInfo, season: parseInt(e.currentTarget.value) })}
          />
          <input
            type="text"
            placeholder="Note (Optional)"
            className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
            value={recordInfo.note}
            onChange={e => setRecordInfo({ ...recordInfo, note: e.currentTarget.value })}
          />
          <button className='btn btn-sm' onClick={(e) => handleOnAdd(e.currentTarget)}>Add Record</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanUp}>close</button>
      </form>
    </>
  )
}