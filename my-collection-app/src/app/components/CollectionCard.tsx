import Image from 'next/image'
import Link from 'next/link'

// Components
import DeleteCollectionBtn from '@/app/components/DeleteCollectionBtn'

// Models
import { Collection } from '@/app/models/dataType'

// Assets
import NoImageIcon from '../../../public/no-image-svgrepo-com.svg'

interface CollectionCardProps {
  collection: Collection
}

const CollectionCard = (props: CollectionCardProps) => {
  return (
    <div className="card w-auto h-[400px] bg-base-300 shadow-xl group focus:ring-2 focus:ring-sky-500" tabIndex={0}>
      <figure className='relative w-auto h-full'>
        <Image
          fill
          priority
          style={{ objectFit: 'cover' }}
          src={props.collection.image ? props.collection.image : NoImageIcon}
          alt='collection Image' />
      </figure>
      <div className="card-body w-full py-2 px-2 justify-between">
        <div className='flex flex-col gap-2'>
          <h2 className="text-2xl truncate">{props.collection.title}</h2>
          <p>Number of Records: {props.collection.numberOfRecords}</p>
          <p>Create Date: {props.collection.creationDate}</p>
        </div>
        <div className="card-actions justify-end">
          <Link className="btn btn-primary" href={
            {
              pathname: '/collection',
              query: { id: props.collection.id }
            }
          } replace>View Records</Link>
        </div>
      </div>
      <div className='absolute top-5 right-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10 group-focus:opacity-100'>
        <DeleteCollectionBtn collectionId={props.collection.id} collectionName={props.collection.title} />
      </div>
    </div>
  )
}

export default CollectionCard