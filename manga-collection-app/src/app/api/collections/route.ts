import { NextRequest, NextResponse } from "next/server";

// third parties imports
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// local imports
import Collection from "../../model/collectionModel";


type JSONData = {
  results: Collection[]
}

/**
 * Get all collections
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/collections")
  try {
    console.log("Reading the json...")
    const json = fs.readFileSync('src/app/fakeData/fakeCollections.json', 'utf-8')
    const data: JSONData = JSON.parse(json)

    console.log("Sending data...")
    return NextResponse.json({ data: data.results }, { status: 200 })

  } catch (error) {
    console.error("Error in getting collections from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

type CollectionPostRequest = {
  image?: string,
  name: string
}

/**
 * Create a new collection
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("POST /api/collections")
  try {
    const body: CollectionPostRequest = await req.json()
    console.log("Received data:", body)

    const newCollection: Collection = {
      id: uuidv4(),
      name: body.name,
      numberOfItems: 0,
      creationDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    console.log('Adding new collection:', newCollection)
    const json = fs.readFileSync('src/app/fakeData/fakeCollections.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    data.results.push(newCollection)

    console.log('Writing to file...')
    fs.writeFileSync('src/app/fakeData/fakeCollections.json', JSON.stringify(data, null, 2))

    console.log('Sending response...')
    return NextResponse.json({}, { status: 201 })

  } catch (error) {
    console.error("Error in creating new collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

/**
 * Update a collection
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  console.log("PATCH /api/collections")
  try {
    const body: Collection = await req.json()
    console.log("Received data:", body)

    console.log('Updating collection:', body)
    const json = fs.readFileSync('src/app/fakeData/fakeCollections.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const index = data.results.findIndex(collection => collection.id === body.id)
    if (index === -1) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }
    data.results[index] = body

    console.log('Writing to file...')
    fs.writeFileSync('src/app/fakeData/fakeCollections.json', JSON.stringify(data, null, 2))

    console.log('Sending response...')
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in updating collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

/**
 * Delete a collection
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  console.log("DELETE /api/collections")
  try {
    const body: Collection = await req.json()
    console.log("Received data:", body)

    console.log('Deleting collection:', body)
    const json = fs.readFileSync('src/app/fakeData/fakeCollections.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const index = data.results.findIndex(collection => collection.id === body.id)
    if (index === -1) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }
    data.results.splice(index, 1)

    console.log('Writing to file...')
    fs.writeFileSync('src/app/fakeData/fakeCollections.json', JSON.stringify(data, null, 2))

    console.log('Sending response...')
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in deleting collection and store to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}