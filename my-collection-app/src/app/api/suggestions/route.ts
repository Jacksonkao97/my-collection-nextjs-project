import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/db/db'
import { Suggestion } from "@/app/models/suggestionModel";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/suggestions");
  try {
    const suggestionsData = await prisma.suggestions.findMany({
      take: 5,
      orderBy: {
        date: 'desc'
      }
    })

    const payload: Suggestion[] = suggestionsData.map((suggestion) => {
      return {
        id: suggestion.id,
        title: suggestion.title,
        image: suggestion.image,
        url: suggestion.url,
        date: new Intl.DateTimeFormat('en-US').format(suggestion.date)
      }
    })

    return NextResponse.json({ suggestions: payload }, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}