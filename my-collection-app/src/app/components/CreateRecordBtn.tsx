'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Third-party
import { toast } from 'sonner'

// Models
import { Item } from '@/app/models/dataType'

// Actions
import addRecord from '@/app/actions/addRecord'
import getItemList from '@/app/actions/getItemList'

// MARK: - CreateRecordBtn
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
        <AddRecordModel />
      </dialog>
    </div>
  )
}

export default CreateRecordBtn

// MARK: - AddRecordModel
const AddRecordModel = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [itemTitle, setItemTitle] = useState('')
  const [itemList, setItemList] = useState<Item[]>([])
  const [recordInfo, setRecordInfo] = useState<{ title: string, type: string, episode: number, season: number, note?: string, itemId?: string }>(
    { title: '', type: 'Book', episode: 0, season: 0, note: '', itemId: '' }
  )

  const cleanUp = () => {
    setRecordInfo({ title: '', type: '', episode: 0, season: 0, note: '', itemId: '' })
    setItemTitle('')
  }

  useEffect(() => {
    setItemTitle(recordInfo.title)
  }, [recordInfo.title])

  useEffect(() => {
    getItemList({ limit: 5, offset: 0, contains: itemTitle })
      .then((res) => {
        setItemList(res)
      })
      .catch(err => {
        toast.error('Connection error! cannot retrieve Item list, please try again later')
      })
  }, [itemTitle])

  return (
    <>
      <div className='modal-box w-[400px] flex flex-col gap-4 sm:w-[640px] sm:max-w-none sm:flex-row'>
        <div className='w-full sm:w-1/2 flex flex-col gap-1'>
          <SelectForm list={itemList} onChange={(item: Item) => setRecordInfo({
            ...recordInfo,
            title: item.title,
            type: item.type,
            episode: item.episode,
            season: item.season,
            itemId: item.id
          })} />
        </div>
        <div className='w-full sm:w-1/2 flex flex-col gap-1'>
          <RecordForm id={id!} recordInfo={recordInfo} onchange={(itemTitle: string) => setItemTitle(itemTitle)} />
        </div>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={cleanUp}>✕</button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={cleanUp}>close</button>
      </form>
    </>
  )
}

interface SelectFormProps {
  list: Item[],
  onChange: (item: Item) => void
}

// MARK: - SelectForm
const SelectForm = (props: SelectFormProps) => {
  const [itemList, setItemList] = useState<Item[]>(props.list)

  useEffect(() => {
    setItemList(props.list)
  }, [props.list])

  return (
    <div className='flex flex-col w-full h-full rounded-box p-2 gap-2 bg-neutral'>
      <h1 className='text-2xl'>Similar Items:</h1>
      {itemList.length > 0 ? itemList.map(item => (
        <div key={item.id}>
          <button className='btn btn-sm' onClick={() => props.onChange(item)}>{item.title}</button>
        </div>
      )) : 'No item found'}
    </div>
  )
}

interface RecordFormProps {
  id: string,
  recordInfo: { title: string, type: string, episode: number, season: number, note?: string, itemId?: string },
  onchange: (itemTitle: string) => void
}

// MARK: - RecordForm
const RecordForm = (props: RecordFormProps) => {
  const [recordInfo, setRecordInfo] = useState(props.recordInfo)

  const handleOnAdd = async (e: HTMLButtonElement) => {
    e.disabled = true

    if (!recordInfo.title && !recordInfo.type) {
      toast.warning('Record title and type are required')
      e.disabled = false
      return
    } else {
      await addRecord({ collectionId: props.id!, title: recordInfo.title, type: recordInfo.type, episode: recordInfo.episode, season: recordInfo.season, note: recordInfo.note, itemId: recordInfo.itemId })
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
    setRecordInfo({ title: '', type: 'Book', episode: 0, season: 0, note: '', itemId: '' })
    props.onchange('')
  }

  useEffect(() => {
    setRecordInfo(props.recordInfo)
  }, [props.recordInfo])

  return (
    <>
      <label>The Record info:</label>
      <input
        type="text"
        placeholder="Record Title"
        className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
        value={recordInfo.title}
        onChange={e => {
          setRecordInfo({ ...recordInfo, title: e.currentTarget.value, itemId: '' })
          props.onchange(e.currentTarget.value)
        }}
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
        value={recordInfo.episode}
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
        value={recordInfo.season}
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
    </>
  )
}