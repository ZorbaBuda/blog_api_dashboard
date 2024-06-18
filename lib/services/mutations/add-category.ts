"use server";

import { getAuthSession } from "@/lib/next-auth";
import connect from "@/lib/db";
import { CategoryProps, categorySchema } from "@/schemas/category-schema";
import escapeStringRegexp from "escape-string-regexp";
import { revalidatePath } from "next/cache";
import Category from "@/lib/models/category";

export async function addCategory({ values }: { values: CategoryProps }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = categorySchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { categoryName, slug, description } = data;

  const escapedCategoryName = escapeStringRegexp(categoryName);
  const escapedSlug = escapeStringRegexp(slug);

  await connect()

  const categoryExist = await Category.find({categoryName, userId})

  // const categoryExist = await Category.find({
  //   where: {
  //     categoryName: {
  //       equals: escapedCategoryName,
  //       mode: "insensitive",
  //     },
  //     AND: {
  //       userId,
  //     },
  //   },
  // });
  console.log(categoryExist)
  console.log(categoryExist.length)

  if (categoryExist.length > 0) {
    return { error: "Category already exists", errorType: "categoryName" };
  }

  const slugExist = await Category.find({
    where: {
      slug: {
        equals: escapedSlug,
        mode: "insensitive",
      },
      AND: {
        userId,
      },
    },
  });

  if (slugExist.length > 0) {
    return { error: "Category slug already exists", errorType: "slug" };
  }

  try {
    const response = await Category.create({
     
        categoryName,
        slug,
        description,
        userId,
   
    });

    revalidatePath("/", "layout");

    return {
      success: "Category created successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
