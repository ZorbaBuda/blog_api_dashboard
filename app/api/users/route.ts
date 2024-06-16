import { NextResponse } from "next/server"
import connect from '@/lib/db'
import User from "@/lib/models/user"
import { Console } from "console"
// export const GET = async () => {
//     return new NextResponse("This is my first api");
// }

// export async function GET(){
//     return new NextResponse("this is my first api")
// }

export async function GET()  {
    try {
        await connect()
        const users = await User.find()
        return new NextResponse(JSON.stringify(users), {status: 200})
     } catch (error){
        return new NextResponse("Error in fetching users" + error, {status: 500})
     }
}

export async function POST(request: Request){
    try {
        const body = await request.json()

        await connect()
        const newUser = new User(body)
        await newUser.save()

        return new NextResponse(JSON.stringify({
            message:"user is created", 
            user:newUser}),
             {status: 201})
    } catch ( error){
        JSON.stringify({
            message: "Error in creating user",
            error
        }),
        { status: 500}
    }
}

// 28:47