import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/db/db'
import { News } from '@/app/models/newsModel'

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/news")
  try {
    const newsData = await prisma.news.findMany({
      take: 10,
      orderBy: {
        date: 'desc'
      }
    })

    const payload: News[] = newsData.map((news) => {
      return {
        date: new Intl.DateTimeFormat('en-US').format(news.date),
        id: news.id,
        title: news.title,
        url: news.url,
      }
    })

    return NextResponse.json({ news: payload }, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}