import { client } from "@/libs/microcms";
import { NextResponse } from "next/server";

export async function GET() {
  const sceneId = 'initial_scene';

  try {
    const data = await client.get({
      endpoint: `scenes/${sceneId}`,
      queries: {
        fields: "id,background,messages,actions"
      }
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ error: "failed fetch scene" }, { status: 500 })
  }
}