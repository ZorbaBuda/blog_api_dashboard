import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

const getUsers = async () => {

    try {
    await connect();

    const users = await User.find()
    return new NextResponse(JSON.stringify(users), {status: 200})
 } catch (error){
    return new NextResponse("Error in fetching users" + error, {status: 500})
 }
}

export default getUsers