import Image from "next/image"

// Models
import { Item } from "@/app/models/dataType"

// Assets
import defaultImage from "@/app/assets/noImage.svg"

// Components
import DeleteItemBtn from "@/app/components/DeleteItemBtn"
import EditItemBtn from "@/app/components/EditItemBtn"

interface ItemCardProps {
  item: Item
}

const ItemCard = (props: ItemCardProps) => {
  return (
    <div className="card w-full h-[200px] card-side bg-base-100 shadow-xl group">
      <div className='absolute top-5 right-5 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:z-10 group-focus:opacity-100'>
        <DeleteItemBtn itemId={props.item.id} />
      </div>
      <figure className="relative w-1/2">
        <Image
        fill
          priority
          style={{ objectFit: 'cover' }}
          src={props.item.image || defaultImage}
          alt="Item image"
        />
      </figure>
      <div className="card-body w-1/2">
        <h2 className="card-title">{props.item.title}</h2>
        <h3>Episode: {props.item.episode || 0}</h3>
        <h3>Season: {props.item.season || 0}</h3>
        <div className="card-actions justify-end">
          <EditItemBtn item={props.item} />
        </div>
      </div>
    </div>
  )
}

export default ItemCard