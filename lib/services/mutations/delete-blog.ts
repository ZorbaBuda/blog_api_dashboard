"use server";

import connect from "../../db";
import type { IUser, IUserDocument } from "../../models/user";
import Blog from "../../models/blog";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
// import { prisma } from "@/lib/prisma";

export async function deleteBlog({
  deleteId,
}: {
  deleteId: string | string[];
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  if (!deleteId) {
    return { error: "Need to pass blog Id" };
  }

  const userId = session.user.id;

  if (typeof deleteId === "string") {
    try {
      await connect()

      console.log(deleteId)
      const response = await Blog.findByIdAndDelete(deleteId)
      //   where: {
      //     id_userId: {
      //       id: deleteId,
      //       userId: userId,
      //     },
      //   },
      // });

      revalidatePath("/", "layout");

      return {
        success: `Blog deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await Blog.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
          userId: userId,
        },
      });

      const result = JSON.parse(JSON.stringify(response))


      revalidatePath("/", "layout");

      return {
        success: `${deleteId.length} blogs deleted`,
        data: result,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}

export type DeleteBlogProps = typeof deleteBlog;
