import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/db";

// third parties imports
import { v4 as uuidv4 } from 'uuid';

interface RequestParams {
  "collection-id": string
}

/**
 * Get all records in a collection
 */
export async function GET(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`GET /api/collections/[${params["collection-id"]}]`)

  try {
    console.log("Getting collection id...")
    const collectionId = params["collection-id"]

    console.log("Getting collection items from database...")
    const records = await prisma.itemRecord.findMany({
      where: {
        collectionId: collectionId
      },
      orderBy: {
        creationDate: 'desc'
      }
    })

    console.log("Packaging data...")
    const payload = await Promise.all(records.map(async record => ({
      id: record.id,
      title: await prisma.item.findUnique({ where: { id: record.itemId } }).then(item => item?.title),
      episode: await prisma.item.findUnique({ where: { id: record.itemId } }).then(item => item?.episode),
      season: await prisma.item.findUnique({ where: { id: record.itemId } }).then(item => item?.season),
      note: record.notes,
      creationDate: new Intl.DateTimeFormat('en-US').format(record.creationDate),
      lastUpdated: new Intl.DateTimeFormat('en-US').format(record.lastUpdate),
    })))

    console.log("Sending data...")
    return NextResponse.json({ records: payload }, { status: 200 })

  } catch (error) {
    console.error("Error in get records---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface POSTRequestBody {
  title: string,
  type: string,
  episode?: number,
  season?: number,
  note?: string,
  itemId?: string
}

/**
 * Create a new record in a collection
 */
export async function POST(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`POST /api/collections/[${params["collection-id"]}]`)

  try {
    console.log("Getting collection id...")
    const collectionId = params["collection-id"]

    console.log("Received data...")
    const body: POSTRequestBody = await req.json()

    const itemExists = await prisma.item.findFirst({
      where: {
        id: body.itemId
      }
    })

    if (itemExists) {
      console.log("Updating existing item...")
      await prisma.item.update({
        where: {
          id: itemExists.id
        },
        data: {
          type: body.type,
          episode: body.episode || null,
          season: body.season || null,
        }
      })

      console.log("Creating new record from existing item...")
      const newRecord = await prisma.itemRecord.create({
        data: {
          id: uuidv4(),
          itemId: itemExists.id,
          collectionId: collectionId,
          notes: body.note || null,
          creationDate: new Date().toISOString(),
          lastUpdate: new Date().toISOString(),
        }
      })

    } else {
      console.log("Creating new item...")
      const item = await prisma.item.create({
        data: {
          id: uuidv4(),
          title: body.title,
          type: body.type,
          episode: body.episode || null,
          season: body.season || null,
        }
      })

      console.log("Creating new record...")
      const newRecord = await prisma.itemRecord.create({
        data: {
          id: uuidv4(),
          itemId: item.id,
          collectionId: collectionId,
          notes: body.note || null,
          creationDate: new Date().toISOString(),
          lastUpdate: new Date().toISOString(),
        }
      })
    }

    console.log("Updating collection...")
    await prisma.recordCollection.update({
      where: { id: collectionId },
      data: {
        numOfRecords: {
          increment: 1
        }
      }
    })

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in create item---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface DELETERequestBody {
  recordId: string
}

/**
 * Delete the record in a collection
 */
export async function DELETE(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`DELETE /api/collections/[${params["collection-id"]}]`)

  try {
    console.log("Getting collection id...")
    const collectionId = params["collection-id"]

    console.log("Received data...")
    const body: DELETERequestBody = await req.json()

    console.log("Deleting record...")
    await prisma.itemRecord.delete({
      where: {
        id: body.recordId
      }
    })

    console.log("Updating collection...")
    await prisma.recordCollection.update({
      where: { id: collectionId },
      data: {
        numOfRecords: {
          decrement: 1
        }
      }
    })

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in delete record---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface PATCHRequestBody {
  recordId: string,
  episode?: number,
  season?: number,
  note?: string,
}

/**
 * Update the record in a collection
 */
export async function PATCH(req: NextRequest, { params }: { params: RequestParams }): Promise<NextResponse> {
  console.log(`PATCH /api/collections/[${params["collection-id"]}]`)

  try {
    console.log("Getting collection id...")
    const collectionId = params["collection-id"]

    console.log("Received data...")
    const body: PATCHRequestBody = await req.json()

    console.log("Updating item...")
    await prisma.item.update({
      where: {
        id: await prisma.itemRecord.findUnique({ where: { id: body.recordId } }).then(record => record?.itemId)
      },
      data: {
        episode: body.episode || null,
        season: body.season || null,
      }
    })

    console.log("Updating record...")
    await prisma.itemRecord.update({
      where: {
        id: body.recordId
      },
      data: {
        notes: body.note || null,
        lastUpdate: new Date().toISOString()
      }
    })

    console.log("Sending data...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in update record---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}