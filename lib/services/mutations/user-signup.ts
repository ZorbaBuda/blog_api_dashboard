"use server";

import connect from "@/lib/db";
import User from "@/lib/models/user";

import bcrypt from "bcrypt";
// import { prisma } from "@/lib/prisma";
import { signupSchema, SignupProps } from "@/schemas/signup-schema";

export async function userSignup({ values }: { values: SignupProps }) {

    // console.log(values, '❤')
  const parsedBody = signupSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { username, email, password } = data;

  await connect();

  const usernameExists = await User.findOne({
    where: {
      username: username,
    },
  });

  const emailExists = await User.findOne({
    where: {
      email: email,
    },
  });

  if (usernameExists) {
    return { error: "Username already exists", errorType: "username" };
  }

  if (emailExists) {
    return { error: "Email already exists", errorType: "email" };
  }

  const saltValue = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltValue);

  try {
    const response = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (response.id) {
      return {
        success: "Account Created Successfully",
      };
    }
  } catch (error) {
    console.log("errorData", error);

    return {
      error: "Something went wrong",
      data: error,
    };
  }
}
