import { NextRequest, NextResponse } from "next/server";

// third parties imports
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// local imports
import News from "../../model/newsModel";

interface JSONData {
  results: News[]
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log("GET /api/news")
  try {
    console.log("Reading the json...")
    const json = fs.readFileSync('src/app/fakeData/fakeNews.json', 'utf-8')
    const data: JSONData = JSON.parse(json)

    console.log("Sending data...")
    return NextResponse.json({ data: data.results }, { status: 200 })

  } catch (error) {
    console.error("Error in getting collections from json", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}