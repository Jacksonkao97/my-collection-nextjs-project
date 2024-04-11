import React from 'react'
import Link from 'next/link'

// Components
import AddItemButton from '@/app/components/AddItemButton'

const TableLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row px-6 justify-between'>
        <Link className="btn btn-primary" href={
          {
            pathname: '/my-collection/',
          }
        }>Back</Link>
        <AddItemButton />
      </div>
      {children}
    </div>
  )
}

export default TableLayout