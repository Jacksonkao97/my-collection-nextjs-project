'use server'

// Models
import { Item } from "@/app/models/dataType"

interface Props {
  limit: number
  offset: number
  contains?: string
  type?: string
}

const getItemList = async (props: Props) => {
  const items = await fetch(`${process.env.BASE_URL}/api/items?limit=${props.limit}&offset=${props.offset}&contains=${props.contains}&type=${props.type}`, { cache: "no-store" })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data: { items: Item[] } = await res.json()
      return data.items
    })
    .catch(err => {
      console.error(err.message)
      throw new Error(err.message)
    })

  return items
}

export default getItemList