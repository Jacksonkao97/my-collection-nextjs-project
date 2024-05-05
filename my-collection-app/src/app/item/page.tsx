// Components
import ItemList from "@/app/components/ItemList"

const Item = async () => {
  return (
    <div className='flex flex-col w-full min-w-[400px] sm:px-[50px] md:px-[100px]'>
      <ItemList />
    </div>
  )
}

export default Item