import connect from "../db";
import type { IUser, IUserDocument } from "../models/user";
import User from "../models/user";

 const getUserByEmail = async (email: string) => {
    await connect()
    const data : IUserDocument[] = await User.find({ email: email });

    const first = data[0]
    console.log(data)
    return {
        id: first.id,
        role: first.role,
        username: first.username,
        email:first.email,
        password: first.password,
        createdAt: first.createdAt,
        updatedAt: first.updatedAt
    } 
  
};