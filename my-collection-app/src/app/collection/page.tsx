import Link from 'next/link'

// Models
import { Record } from '@/app/models/dataType'

// Components
import CollectionRecordTable from '@/app/components/CollectionRecordTable'
import CreateRecordBtn from '@/app/components/CreateRecordBtn'

// Actions
import getRecordList from '@/app/actions/getRecordList'

interface SearchParams {
  id: string,
}

const Collection = async ({ searchParams }: { searchParams: SearchParams }) => {
  const collectionId = searchParams.id
  const table: Record[] = await getRecordList(collectionId)

  return (
    <div className='flex flex-col gap-3 justify-center w-full min-w-[400px] sm:px-[50px] md:px-[100px]'>
      <Link
        className='btn btn-sm w-20'
        href={
          {
            pathname: '/',
          }
        }>Back</Link>
      <CollectionRecordTable table={table} />
      <div className="fixed right-[25px] bottom-[25px]">
        <CreateRecordBtn />
      </div>
    </div>
  )
}

export default Collection