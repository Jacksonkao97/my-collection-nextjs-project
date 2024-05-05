import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/db";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log(`GET /api/items`)
  try {
    console.log("Getting limit and offset...")
    const searchParams = req.nextUrl.searchParams
    const limit = searchParams.get('limit') || "5"
    const offset = searchParams.get('offset') || "0"
    const contains = searchParams.get('contains') || 'undefined'
    const type = searchParams.get('type') || 'undefined'

    console.log("Getting items from database...")
    const items = await prisma.item.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
      where: {
        ... (contains !== 'undefined' ? { title: { contains: contains } } : {}),
        ... (type !== 'undefined' ? { type: { equals: type } } : {})
      },
    })

    console.log("Packaging data...")
    const payload = items.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episode: item.episode,
      season: item.season,
      image: item.image,
    }))

    console.log("Sending response...")
    return NextResponse.json({ items: payload }, { status: 200 })

  } catch (error) {
    console.error("Error in get items---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
}

interface PATCHItemRequest {
  itemId: string,
  title?: string,
  type?: string,
  episode?: number,
  season?: number,
  country?: string,
  image?: string,
  author?: string,
  url?: string,
  date?: string,
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  console.log(`PATCH /api/items`)
  try {
    console.log("Parsing request body...")
    const body: PATCHItemRequest = await req.json()

    console.log("Updating item in database...")
    await prisma.item.update({
      where: {
        id: body.itemId,
      },
      data: {
        ...body.title && { title: body.title },
        ...body.type && { type: body.type },
        ...body.episode && { episode: body.episode },
        ...body.season && { season: body.season },
        ...body.country && { country: body.country },
        ...body.image && { image: body.image },
        ...body.author && { author: body.author },
        ...body.url && { url: body.url },
        ...body.date && { date: new Date(body.date) },
      },
    })

    console.log("Sending response...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in patch item---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

interface DeleteItemRequest {
  itemId: string,
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  console.log(`DELETE /api/items`)
  try {
    console.log("Parsing request body...")
    const body: DeleteItemRequest = await req.json()

    console.log("Getting item record from database...")
    const records = await prisma.itemRecord.findMany({
      where: {
        itemId: body.itemId,
      },
    })

    console.log("Deleting item from database...")
    await prisma.item.delete({
      where: {
        id: body.itemId,
      },
    })

    console.log("Updating collection count...")
    records.forEach(async record => {
      await prisma.recordCollection.update({
        where: {
          id: record.collectionId,
        },
        data: {
          numOfRecords: {
            decrement: 1,
          },
        },
      })
    })

    console.log("Sending response...")
    return NextResponse.json({}, { status: 200 })

  } catch (error) {
    console.error("Error in delete item---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}