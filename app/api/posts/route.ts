import { NextResponse } from "next/server";
import connect from '@/lib/db'
import Post from "@/lib/models/post";

export async function GET()  {
    try {
        await connect()
        const users = await Post.find()
        return new NextResponse(JSON.stringify(users), {status: 200})
     } catch (error){
        return new NextResponse("Error in fetching posts" + error, {status: 500})
     }
}

