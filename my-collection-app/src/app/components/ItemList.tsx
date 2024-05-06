'use client'
import { useEffect, useState } from "react"

// Components
import ItemCard from "@/app/components/ItemCard"

// Actions
import getItemList from "@/app/actions/getItemList"

// Models
import { Item } from "@/app/models/dataType"

// Third Party
import { toast } from "sonner"

enum CateType {
  Book = 'Book',
  Drama = 'Drama',
  Movie = 'Movie',
  Others = 'Others',
}

const ItemList = () => {
  const [itemCate, setItemCate] = useState(CateType.Book)
  const [itemList, setItemList] = useState<Item[]>([])
  const [page, setPage] = useState(0)

  const runServerAction = async ({ limit, offset, type }: { limit: number, offset: number, type: CateType }) => {
    await getItemList({ limit: limit, offset: offset, type: type })
      .then((res) => {
        setItemList(res)
      })
      .catch((err) => {
        toast.error('Failed to get the selected category list')
      })
  }

  useEffect(() => {
    runServerAction({ limit: 6, offset: page * 6, type: itemCate })
  }, [itemCate, page])

  useEffect(() => {
    setPage(0)
  }, [itemCate])

  useEffect(() => {
    if (itemList.length < 6) {
      document.getElementById('nextBtn')?.setAttribute('disabled', 'true')
    } else {
      document.getElementById('nextBtn')?.removeAttribute('disabled')
    }
  }, [itemList])

  useEffect(() => {
    scrollTo(0, 0)

    if (page === 0) {
      document.getElementById('prevBtn')?.setAttribute('disabled', 'true')
    } else {
      document.getElementById('prevBtn')?.removeAttribute('disabled')
    }
  }, [page])

  return (
    <div className="relative flex flex-col w-full gap-7 bg-base-200 p-3">
      <div className='flex flex-row gap-3 justify-center'>
        <button onClick={() => setItemCate(CateType.Book)} className='px-3 py-2 bg-primary rounded-md'>Book</button>
        <button onClick={() => setItemCate(CateType.Drama)} className='px-3 py-2 bg-primary rounded-md'>Drama</button>
        <button onClick={() => setItemCate(CateType.Movie)} className='px-3 py-2 bg-primary rounded-md'>Movie</button>
        <button onClick={() => setItemCate(CateType.Others)} className='px-3 py-2 bg-primary rounded-md'>Others</button>
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {itemList.map((item, index) => (
          <ItemCard item={item} key={index} />
        ))}
      </div>
      <div className="flex justify-center content-center">
        <div className="join grid grid-cols-2 w-[200px]">
          <button id="prevBtn" className="join-item btn btn-outline bg-primary" onClick={() => setPage(page - 1)}>Previous Page</button>
          <button id="nextBtn" className="join-item btn btn-outline bg-primary" onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
      </div>
    </div>
  )
}

export default ItemList