import React from 'react'
import Link from 'next/link'

// Components
import AddItemButton from '@/app/components/AddItemButton'

const CollectionLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between gap-4 min-w-max drop-shadow-xl'>
        <Link className="btn btn-primary" href={
          {
            pathname: '/',
          }
        }
          replace>Back</Link>
        <AddItemButton />
      </div>
      {children}
    </div>
  )
}

export default CollectionLayout