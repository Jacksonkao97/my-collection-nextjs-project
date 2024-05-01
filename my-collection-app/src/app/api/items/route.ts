import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db/db";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log(`GET /api/items`)
  try {
    console.log("Getting limit and offset...")
    const searchParams = req.nextUrl.searchParams
    const limit = searchParams.get('limit') || "5"
    const offset = searchParams.get('offset') || ""

    console.log("Getting items from database...")
    const items = await prisma.item.findMany({
      take: parseInt(limit),
      where: {
        title: {
          startsWith: offset
        }
      },
    })

    console.log("Packaging data...")
    const payload = items.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episode: item.episode,
      season: item.season,
    }))

    console.log("Sending response...")
    return NextResponse.json({ items: payload }, { status: 200 })

  } catch (error) {
    console.error("Error in get items---->", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}