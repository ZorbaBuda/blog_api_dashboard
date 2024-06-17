import connect from "@/lib/db";
import type { IUser, IUserDocument } from "@/lib//models/user";
import User from "@/lib/models/user";

 const getUserByEmail = async (email: string) => {
    await connect()
    const data   = await User.findOne({ email: email });

    if(!data) return null

    console.log(data)
    return {
        id: data.id,
        role: data.role,
        username: data.username,
        email:data.email,
        logoUrl: data.logoUrl,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    } 
  
};

export default getUserByEmail

// const response: {
//     id: string;
//     role: string;
//     username: string;
//     email: string;
//     password: string;
//     logoUrl: string | null;
//     logoId: string | null;
//     createdAt: Date;
//     updatedAt: Date;
// } | null