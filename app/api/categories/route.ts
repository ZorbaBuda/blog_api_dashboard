import { NextRequest, NextResponse } from "next/server" 
import connect from "@/lib/db"
import Category from "@/lib/models/category"


export async function GET() {
    try {
        await connect()
        const categories = await Category.find()
        .sort({categoryName : 1})
        // .select("categoryName")

        return new NextResponse(JSON.stringify(categories), {status : 200})
    } catch (error) {
        return NextResponse.json(
          { error: true, message: "Something went wrong", data: error },
          { status: 500 }
        );
    }
    
}