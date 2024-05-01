'use server'

// Models
import { Item } from "@/app/models/dataType"

const getItemList = async (limit: number, offset: string) => {
  const items = await fetch(`${process.env.BASE_URL}/api/items?limit=${limit}&offset=${offset}`, { cache: "no-store" })
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