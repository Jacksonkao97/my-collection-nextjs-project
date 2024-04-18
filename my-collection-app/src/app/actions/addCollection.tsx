'use server'

interface AddCollectionProps {
  image?: File | null,
  imageType?: string | null,
  name: string,
}

const addCollection = async (collectionInfo: AddCollectionProps) => {
  if (collectionInfo.name === '') {
    return false
  }

  const [image, imageType] = await base64Encode(collectionInfo.image as File | null)

  try {
    const payload = {
      image: image as string | null,
      imageType: imageType,
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

/**
   * This function will convert the image to base64
   * @param file 
   */
const base64Encode = async (file: File | null): Promise<[string | ArrayBuffer | null, string | null]> => {
  if (!file) {
    return [null, null]
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve([reader.result, file.type])
    }
    reader.onerror = (error) => {
      console.error(error)
      reject([null, null])
    }
  })
}

export default addCollection