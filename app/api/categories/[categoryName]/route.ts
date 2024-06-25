import { NextRequest, NextResponse, userAgent } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/models/blog";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryName: string } }
) {
 
  const categoryName = params.categoryName;

  try {
    await connect() 

    const response = await Blog.find({
        "categories": categoryName
      }).sort({createdAt : -1})

    if (response) {
      const sentResponse = NextResponse.json(
        { success: true, data: response },
        { status: 200 }
      );

  
      return sentResponse;
    } else {
      return NextResponse.json(
        { error: true, message: "Category not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
