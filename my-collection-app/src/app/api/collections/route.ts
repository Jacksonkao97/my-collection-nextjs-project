import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/db";

// third parties imports
import { v4 as uuidv4 } from 'uuid';

/**
 * Get all collections
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/collections")

  try {
    console.log("Getting collections from database...")
    const collections = await prisma.recordCollection.findMany({
      take: 10,
      orderBy: {
        creationDate: 'desc'
      }
    })

    console.log("Packaging data...")
    const payload = collections.map(collection => ({
      id: collection.id,
      image: collection.image,
      imageType: collection.imageType,
      title: collection.title,
      numberOfRecords: collection.numOfRecords,
      creationDate: new Intl.DateTimeFormat('en-US').format(collection.creationDate),
      note: collection.notes,
    }))

    console.log("Sending data...")
    return NextResponse.json({ collections: payload }, { status: 200 })

  } catch (error) {
    console.error("Error in get collections---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface POSTRequestBody {
  title: string,
  image?: string | null,
  imageType?: string | null,
  note?: string | null,
}

/**
 * Create a new collection
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log("POST /api/collections")

  try {
    console.log("Received data...")
    const body: POSTRequestBody = await req.json()

    console.log("Creating new collection...")
    const newCollection = await prisma.recordCollection.create({
      data: {
        id: uuidv4(),
        image: body.image || null,
        imageType: body.imageType || null,
        title: body.title,
        numOfRecords: 0,
        creationDate: new Date().toISOString(),
        notes: body.note || null,
      }
    })

    console.log('Sending response...')
    return NextResponse.json({}, { status: 201 })

  } catch (error) {
    console.error("Error in create collection---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PATCHRequestBody {
  collectionId: string,
  title?: string,
  image?: string | null,
  imageType?: string | null,
  note?: string | null,
}

/**
 * Update a collection
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  console.log("PATCH /api/collections")

  try {
    console.log("Received data...")
    const body: PATCHRequestBody = await req.json()

    const collection = await prisma.recordCollection.findUnique({
      where: {
        id: body.collectionId
      }
    })

    if (!collection) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    } else {
      console.log("Updating collection...")
      await prisma.recordCollection.update({
        where: {
          id: body.collectionId
        },
        data: {
          title: body.title || collection.title,
          image: body.image || collection.image,
          imageType: body.imageType || collection.imageType,
          notes: body.note || collection.notes,
        }
      })

      console.log('Sending response...')
      return NextResponse.json({}, { status: 200 })
    }

  } catch (error) {
    console.error("Error in update colletions---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface DELETERequestBody {
  collectionId: string
}

/**
 * Delete a collection
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  console.log("DELETE /api/collections")

  try {
    console.log("Received data...")
    const body: DELETERequestBody = await req.json()

    const collection = await prisma.recordCollection.findUnique({
      where: {
        id: body.collectionId
      }
    })

    if (!collection) {
      console.log('Collection not found')
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    } else {
      console.log("Deleting records...")
      await prisma.itemRecord.deleteMany({
        where: {
          collectionId: body.collectionId
        }
      })
      console.log("Deleting collection...")
      await prisma.recordCollection.delete({
        where: {
          id: body.collectionId
        }
      })

      console.log('Sending response...')
      return NextResponse.json({}, { status: 200 })
    }

  } catch (error) {
    console.error("Error in delete collections---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}