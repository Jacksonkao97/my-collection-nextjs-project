import { NextRequest, NextResponse } from "next/server";

// third parties imports
import fs from 'fs';

// local imports
import CollectionItem from "@/app/model/collectionItemModel";

type RequestParams = {
  collectionId: string
}

type JSONData = {
  results: {
    id: string,
    data: CollectionItem[]
  }[]
}

export async function GET(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`GET /api/collections/[${params.collectionId}]`)
  try {
    const collectionId = params.collectionId

    console.log("Reading the json...")
    const json = fs.readFileSync('../../../fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collectionItems = data.results.find(collection => collection.id === collectionId)?.data

    console.log("Sending data...")
    return NextResponse.json({ data: collectionItems }, { status: 200 })

  } catch (error) {
    console.error("Error in getting collection items from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

type CollectionPostRequest = {
  data: CollectionItem
}

export async function POST(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`POST /api/collections/[${params.collectionId}]`)
  try {
    const collectionId = params.collectionId
    const body: CollectionPostRequest = await req.json()
    console.log("Received data:", body)

    console.log('Adding new collection item:', body.data)
    const json = fs.readFileSync('../../../fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)
    collection?.data.push(body.data)

    console.log('Writing to json...')
    fs.writeFileSync('../../../fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in adding collection item to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`DELETE /api/collections/[${params.collectionId}]`)
  try {
    const collectionId = params.collectionId
    const body: CollectionItem = await req.json()
    console.log("Received data:", body)

    console.log('Deleting collection item:', body)
    const json = fs.readFileSync('../../../fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)
    collection!.data = collection!.data.filter(collectionItem => collectionItem.id !== body.id)

    console.log('Writing to json...')
    fs.writeFileSync('../../../fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in deleting collection item from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`PATCH /api/collections/[${params.collectionId}]`)
  try {
    const collectionId = params.collectionId
    const body: CollectionItem = await req.json()
    console.log("Received data:", body)

    console.log('Updating collection item:', body)
    const json = fs.readFileSync('../../../fakeData/fakeCollectionItem.json', 'utf-8')
    const data: JSONData = JSON.parse(json)
    const collection = data.results.find(collection => collection.id === collectionId)
    const index = collection!.data.findIndex(collectionItem => collectionItem.id === body.id)
    collection!.data[index] = body

    console.log('Writing to json...')
    fs.writeFileSync('../../../fakeData/fakeCollectionItem.json', JSON.stringify(data, null, 2))

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in updating collection item to json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}