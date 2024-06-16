import { NextResponse } from "next/server"
import connect from '@/lib/db'
import Blog from "@/lib/models/blog"

export async function GET()  {
    try {
        await connect()
        const blogs = await Blog.find()
        return new NextResponse(JSON.stringify(blogs), {status: 200})
     } catch (error){
        return new NextResponse("Error in fetching blogs" + error, {status: 500})
     }
}

// export async function POST(request: Request) {
//     const { title } =
//       await request.json();
//     try {
//       await connect();
  
  
//       const newBlog = await Blog.create({
//         title
//       });
  
//       if (!newBlog) {
//         return NextResponse.json(
//           { message: "Failed to create blog" },
//           { status: 500 }
//         );
//       }
  
  
//       return NextResponse.json({ message: "Blog created" }, { status: 201 });
//     } catch (error) {
//       return NextResponse.json(
//         {
//           message: "Failed to connect with server",
//         },
//         { status: 500 }
//       );
//     }
//   }

export async function POST(request: Request){
    try {
        const body = await request.json()

        await connect()
        const newBlog = new Blog(body)
        console.log(newBlog, '👋')
        await newBlog.save()

        return new NextResponse(JSON.stringify({
            message:"blog is created", 
            blog:newBlog}),
             {status: 201})
    } catch ( error){
        JSON.stringify({
            message: "Error in creating blog",
            error
        }),
        { status: 500}
    }
}