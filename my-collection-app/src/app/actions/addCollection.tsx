'use server'

interface AddCollectionProps {
  image?: string | ArrayBuffer | null,
  imageType?: string | null,
  name: string,
}

const addCollection = async (collectionInfo: AddCollectionProps) => {
  console.log('addCollection', collectionInfo)
  if (collectionInfo.name === '') {
    return false
  }

  try {
    const payload = {
      image: collectionInfo.image as string | null,
      imageType: collectionInfo.imageType as string | null,
      name: collectionInfo.name,
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