'use server'
import { revalidatePath } from "next/cache"

interface AddCollectionProps {
  title: string,
  image?: string | ArrayBuffer | null,
  imageType?: string | null,
  note?: string,
}

const addCollection = async (collectionInfo: AddCollectionProps) => {
  if (collectionInfo.title === '') {
    return false
  }

  try {
    const payload = {
      title: collectionInfo.title,
      image: collectionInfo.image as string | null,
      imageType: collectionInfo.imageType as string | null,
      note: collectionInfo.note,
    }

    const response = await fetch(`${process.env.BASE_URL}/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error(`HTTP error! status: ${res.status}`)
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
  } catch (error) {
    console.error(error)
    return false
  }
}

export default addCollection