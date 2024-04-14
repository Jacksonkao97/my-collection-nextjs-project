import { NextRequest, NextResponse } from "next/server";

// third parties imports
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// local imports
import CollectionItem from "@/app/model/collectionItemModel";

interface RequestParams {
  "collection-id": string
}

interface JSONData {
  results: {
    id: string,
    data: CollectionItem[]
  }[]
}

export async function GET(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`GET /api/collections/[${params["collection-id"]}]`)
  try {
    const collectionId = params["collection-id"]

    console.log("Reading the file...")
    const json = fs.readFileSync('src/app/fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collectionItems: CollectionItem[] = data.results.find(collection => collection.id === collectionId)?.data || []

    console.log("Sending data...")
    return NextResponse.json({ collectionTable: collectionItems }, { status: 200 })

  } catch (error) {
    console.error("Error in getting collection items from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PostRequest {
  name: string,
}

export async function POST(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`POST /api/collections/[${params["collection-id"]}]`)
  try {
    const collectionId = params["collection-id"]
    const body: PostRequest = await req.json()
    console.log("Received data...")

    const collectionItem: CollectionItem = {
      id: uuidv4(),
      name: body.name,
      creationDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    console.log('Reading the file...')
    const json = fs.readFileSync('src/app/fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)

    if (!collection) {
      console.log('Collection not found, creating new collection...')
      data.results.push({ id: collectionId, data: [collectionItem] })
    } else {
      console.log('Collection found, adding to collection...')
      collection?.data.push(collectionItem)
    }

    console.log('Writing to json...')
    fs.writeFileSync('src/app/fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    await fetch(`${process.env.BASE_URL}/api/collections`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ collectionId: collectionId, numberOfItems: collection?.data.length, lastUpdated: new Date().toISOString() })
    })

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in adding collection item to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface DeleteRequest {
  itemId: string
}

/**
 * This function will delete the collection item
 */
export async function DELETE(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`DELETE /api/collections/[${params["collection-id"]}]`)
  try {
    const collectionId = params["collection-id"]
    const body: DeleteRequest = await req.json()
    console.log("Received data...")

    console.log('Reading the file...')
    const json = fs.readFileSync('src/app/fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)

    if (!collection) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    console.log('Deleting collection item...')
    collection.data = collection.data.filter(collectionItem => collectionItem.id !== body.itemId)

    console.log('Writing to json...')
    fs.writeFileSync('src/app/fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in deleting collection item from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PatchRequest {
  itemId: string,
  name?: string,
  description?: string
}

/**
 * This function will update the collection item
 */
export async function PATCH(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`PATCH /api/collections/[${params["collection-id"]}]`)
  try {
    const collectionId = params["collection-id"]
    const body: PatchRequest = await req.json()
    console.log("Received data...")

    console.log('Reading the file...')
    const json = fs.readFileSync('src/app/fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)

    if (!collection) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    const index = collection.data.findIndex(item => item.id === body.itemId)

    if (index === -1) {
      console.log('Collection item not found')
      return NextResponse.json({ error: "Collection item not found" }, { status: 404 })
    } else {
      console.log('Updating collection item...')
      collection.data[index] = {
        ...collection.data[index],
        name: body.name || collection.data[index].name,
        description: body.description || collection.data[index].description,
        lastUpdated: new Date().toISOString()
      }
    }

    console.log('Writing to json...')
    fs.writeFileSync('src/app/fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    await fetch(`${process.env.BASE_URL}/api/collections`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ collectionId: collectionId, lastUpdated: new Date().toISOString() })
    })

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in updating collection item to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}