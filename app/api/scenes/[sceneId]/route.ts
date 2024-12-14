import { client } from "@/libs/microcms";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sceneId: string }> }
) {
  const { sceneId } = await params;
  try {
    const data = await client.get({ endpoint: `scenes/${sceneId}` });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error: ", error)
    return NextResponse.json({ error: "failed fetch scene" }, { status: 500 })
  }
}