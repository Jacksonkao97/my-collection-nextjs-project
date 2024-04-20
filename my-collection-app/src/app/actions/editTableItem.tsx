'use server'
import { revalidatePath } from "next/cache"

interface EditTableItemProps {
  collectionId: string,
  itemId: string,
  name: string,
  note: string,
}

const editTableItem = async (props: EditTableItemProps) => {
  const response = await fetch(`${process.env.BASE_URL}/api/collections/${props.collectionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ itemId: props.itemId, name: props.name, description: props.note })
  })
    .then(async (res) => {
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status} and message: ${res.statusText}`)
        return false
      }
      revalidatePath('/')
      return true
    })
    .catch(err => {
      console.error(err.message)
      return false
    })
  return response
}

export default editTableItem