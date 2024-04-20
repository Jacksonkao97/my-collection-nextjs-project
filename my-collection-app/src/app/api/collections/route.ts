import { NextRequest, NextResponse } from "next/server";

// third parties imports
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Models
import Collection from "@/app/model/collectionModel";
import CollectionItem from "@/app/model/collectionItemModel";

interface JSONData {
  results: Collection[]
}

const filePath = 'src/app/data/Collections.json'

/**
 * Get all collections
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/collections")

  if (!fs.existsSync(filePath)) {
    console.log("Creating a new json file...")
    fs.writeFileSync(filePath, JSON.stringify({ results: [] }, null, 2))
  }

  try {
    console.log("Reading the json...")
    const json = fs.readFileSync(filePath, 'utf-8')
    const data: JSONData = JSON.parse(json)

    console.log("Sending data...")
    return NextResponse.json({ collections: data.results }, { status: 200 })

  } catch (error) {
    console.error("Error in getting collections from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PostRequest {
  image?: string | null,
  imageType?: string | null,
  name: string
}

/**
 * Create a new collection
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("POST /api/collections")

  if (!fs.existsSync(filePath)) {
    console.log("Creating a new json file...")
    fs.writeFileSync(filePath, JSON.stringify({ results: [] }, null, 2))
  }

  try {
    const body: PostRequest = await req.json()
    console.log("Received data...")

    const newCollection: Collection = {
      id: uuidv4(),
      image: body.image || null,
      imageType: body.imageType || null,
      name: body.name,
      numberOfItems: 0,
      creationDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    console.log('Reading the file...')
    const json = fs.readFileSync(filePath, 'utf-8')
    const data: JSONData = JSON.parse(json)

    console.log('Adding new collection...')
    data.results.push(newCollection)

    console.log('Writing to file...')
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log('Sending response...')
    return NextResponse.json({}, { status: 201 })

  } catch (error) {
    console.error("Error in creating new collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PATCHRequest {
  collectionId: string,
  name?: string,
  numberOfItems?: number,
}

/**
 * Update a collection
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  console.log("PATCH /api/collections")

  if (!fs.existsSync(filePath)) {
    console.log("Creating a new json file...")
    fs.writeFileSync(filePath, JSON.stringify({ results: [] }, null, 2))
  }

  try {
    const body: PATCHRequest = await req.json()
    console.log("Received data...")

    console.log('Reading the file...')
    const json = fs.readFileSync(filePath, 'utf-8')
    const data: JSONData = JSON.parse(json)
    const index = data.results.findIndex(collection => collection.id === body.collectionId)
    if (index === -1) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    console.log('Updating collection...')
    data.results[index] = {
      ...data.results[index],
      name: body.name || data.results[index].name,
      numberOfItems: body.numberOfItems || data.results[index].numberOfItems,
      lastUpdated: new Date().toISOString()
    }

    console.log('Writing to file...')
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log('Sending response...')
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in updating collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface DeleteRequest {
  collectionId: string
}

interface JSONData2 {
  results: {
    id: string,
    data: CollectionItem[]
  }[]
}

/**
 * Delete a collection
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  console.log("DELETE /api/collections")

  if (!fs.existsSync(filePath)) {
    console.log("Creating a new json file...")
    fs.writeFileSync(filePath, JSON.stringify({ results: [] }, null, 2))
  }

  try {
    const body: DeleteRequest = await req.json()
    console.log("Received data...")

    console.log('Reading the file...')
    const json = fs.readFileSync(filePath, 'utf-8')
    const data: JSONData = JSON.parse(json)
    const index = data.results.findIndex(collection => collection.id === body.collectionId)
    if (index === -1) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    console.log('Deleting collection...')
    data.results.splice(index, 1)

    console.log('Writing to file...')
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    if (fs.existsSync('src/app/data/CollectionItem.json')) {
      const json2 = fs.readFileSync('src/app/data/CollectionItem.json', 'utf-8')
      const data2: JSONData2 = JSON.parse(json2)
      const index2 = data2.results.findIndex(collection => collection.id === body.collectionId)
      if (index2 !== -1) {
        console.log('Deleting collection items...')
        data2.results.splice(index2, 1)

        console.log('Writing to file...')
        fs.writeFileSync('src/app/data/CollectionItem.json', JSON.stringify(data2, null, 2))
      }
    }

    console.log('Sending response...')
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in deleting collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}