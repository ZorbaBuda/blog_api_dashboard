import { NextRequest, NextResponse, userAgent } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/models/blog";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoryName: string } }
) {
 
  const categoryNameSlug = params.categoryName;

  try {
    await connect() 

    const response = await Blog.find(
      {categorySlug : categoryNameSlug} )
     .sort({createdAt : -1})

     //example of search more than one condition same field
      //  const response = await Blog.find(
      //   { categorySlug: { $exists: 1 , $eq : categoryNameSlug} })
      //  .sort({createdAt : -1})

     

    if (response) {
      console.log(response)
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
