import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Media from "@/lib/models/media";
import { getAuthSession } from "@/lib/next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const medias = await Media.find({ userId: userId})
    .sort({createdAt : -1}) 
    
    return NextResponse.json({ success: true, data: medias });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong", data: error });
  }
}
