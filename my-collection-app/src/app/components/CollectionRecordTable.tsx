'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// Models
import { Record } from '@/app/models/dataType'

// Actions
import editRecord from '@/app/actions/editRecord'
import deleteRecord from '@/app/actions/deleteRecord'

// Third-party
import { toast } from 'sonner'

interface CollectionItemTableProps {
  table: Record[]
}

const CollectionRecordTable = (props: CollectionItemTableProps) => {
  const [table, setTable] = useState<Record[]>(props.table)
  const [search, setSearch] = useState<string>('')

  const handleOnSearch = (e: HTMLInputElement) => {
    setSearch(e.value)
    const filteredTable = props.table.filter(item => item.title.toLowerCase().includes(e.value.toLowerCase()))
    setTable(filteredTable)
  }

  const handleOnEdit = (recordId: String) => {
    const dialog = document.getElementById(`edit_Record_${recordId}`) as HTMLDialogElement
    dialog.showModal()
  }

  useEffect(() => {
    setTable(props.table)
  }, [props.table])

  return (
    <div className='relative flex flex-col w-full gap-7 bg-base-200 p-2'>
      <h1 className='text-2xl'>Records Table:</h1>
      <input className='relative rounded-box w-full h-[40px] sm:absolute sm:w-[250px] top-[5px] right-[5px] bg-transparent hover:bg-base-300 focus:bg-base-300 focus:outline-2 border-b-2 border-black p-2'
        type="text"
        placeholder='Search records...'
        value={search}
        onChange={(e) => handleOnSearch(e.currentTarget)} />
      {table.length === 0 ? <p>No record . . .</p> :
        <div className="overflow-x-auto w-auto min-w-[400px]">
          <table className="table table-pin-cols table-auto">
            <thead>
              <tr className='w-full'>
                <th className='hidden sm:table-cell'>No.</th>
                <th className='truncate max-w-[100px]'>Title</th>
                <th className='hidden lg:table-cell'>Last Update</th>
                <th className='truncate max-w-[60px]'>Episode</th>
                <th className='truncate max-w-[60px]'>Season</th>
                <th className='truncate'>Note</th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => {
                return (
                  <tr key={index} className='cursor-pointer hover:bg-black/20' onClick={() => handleOnEdit(item.id)}>
                    <td className='hidden sm:table-cell'>{index + 1}</td>
                    <td className='truncate max-w-[100px]'>{item.title}</td>
                    <td className='hidden lg:table-cell'>{item.lastUpdated}</td>
                    <td className='truncate max-w-[60px]'>{item.episode || 0}</td>
                    <td className='truncate max-w-[60px]'>{item.season || 0}</td>
                    <td className='truncate'>{item.note || 'No data . . .'}</td>
                    <dialog id={`edit_Record_${item.id}`} className="modal">
                      <EditRecordModel record={item} />
                    </dialog>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>}
    </div>
  )
}

export default CollectionRecordTable

const EditRecordModel = ({ record }: { record: Record }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [recordInfo, setRecordInfo] = useState({ episode: record.episode, season: record.season, note: record.note })

  const handleOnConfirm = async (e: HTMLButtonElement) => {
    e.disabled = true

    await editRecord({ collectionId: id!, recordId: record.id, episode: recordInfo.episode, season: recordInfo.season, note: recordInfo.note })
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
        const dialog = document.getElementById(`edit_Record_${record.id}`) as HTMLDialogElement
        dialog.close()
      })
  }

  const handleOnDelete = async (e: HTMLButtonElement) => {
    e.disabled = true

    await deleteRecord({ collectionId: id!, recordId: record.id })
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
        handleOnClose()
        const dialog = document.getElementById(`edit_Record_${record.id}`) as HTMLDialogElement
        dialog.close()
      })
  }

  const handleOnClose = () => {
    setRecordInfo({ episode: record.episode, season: record.season, note: record.note })
  }

  return (
    <>
      <div className='modal-box w-80 md:w-96 flex flex-col gap-6 cursor-default'>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleOnClose}>✕</button>
        </form>
        <div className='flex flex-col gap-1'>
          <label>The Record info:</label>
          <input
            type="number"
            placeholder="Episode (Optional)"
            className="input input-bordered focus:outline-0 input-sm w-full max-w-xs"
            defaultValue={record.episode}
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
            defaultValue={record.season}
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
          <div className='flex flex-row justify-between'>
            <button className='btn btn-sm bg-red-500' onClick={(e) => handleOnDelete(e.currentTarget)}>Delete</button>
            <button className='btn btn-sm' onClick={(e) => handleOnConfirm(e.currentTarget)}>Confirm</button>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleOnClose}>close</button>
      </form>
    </>
  )
}