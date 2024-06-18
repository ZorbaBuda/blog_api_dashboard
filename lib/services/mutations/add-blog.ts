"use server";

import connect from "@/lib/db";
import Blog from "@/lib/models/blog";
import Media from "@/lib/models/media";
import { getAuthSession } from "@/lib/next-auth";
// import { prisma } from "@/lib/prisma";
import { BlogProps, blogSchema } from "@/schemas/blog-schema";
import { getDescription } from "@/utils/get-description";
import escapeStringRegexp from "escape-string-regexp";
import { revalidatePath } from "next/cache";

export async function addBlog({ values }: { values: BlogProps }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = blogSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const {
    title,
    slug,
    body,
    author,
    categories,
    featuredImage,
    metaDescription,
    published,
    bodyImages,
  } = data;

  const escapedTitle = escapeStringRegexp(title);
  const escapedSlug = escapeStringRegexp(slug);

  await connect()

  // const titleExist = await Blog.find({
  //   where: {
  //     title: {
  //       equals: escapedTitle,
  //       mode: "insensitive",
  //     },
  //     AND: {
  //       userId,
  //     },
  //   },
  // });

  const titleExist = await Blog.find({escapedTitle, userId})
  console.log(titleExist)

  if (titleExist.length > 0) {
    return { error: "Title already exists", errorType: "title" };
  }

  const slugExist = await Blog.find({
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
    return { error: "Slug already exists", errorType: "slug" };
  }

  try {
    const response = await Blog.create({
    
        title,
        slug,
        body,
        author,
        categories,
        metaDescription,
        published,
        featuredImage: {
          imageId: featuredImage.imageId,
          imageUrl: featuredImage.imageUrl,
          imageTitle: featuredImage.imageTitle,
          altText: featuredImage.altText,
        },
        userId: userId,
      
    });

    console.log(response, '😜')

    if (response.id) {
      const imageExist = await Media.find({
        where: {
          imageUrl: featuredImage.imageUrl,
          AND: {
            userId: userId,
          },
        },
      });

      const responseMedia =
        !(imageExist.length > 0)  &&
        (await Media.create({
         
            ...featuredImage,
            userId: userId,
        
        }));

      if (bodyImages) {
        const imagesUrl = bodyImages.map((image) => image.imageUrl);

        const imagesExist = await Media.find({
          where: {
            imageUrl: {
              in: imagesUrl,
            },
            AND: {
              userId: userId,
            },
          },
        });

        // console.log("imagesExist", imagesExist);

        const imagesToSubmit = bodyImages
          .filter(
            (bodyImage) =>
              !imagesExist.some(
                (existingImage) => existingImage.imageUrl === bodyImage.imageUrl
              )
          )
          .map((filteredImage) => ({ ...filteredImage, userId }));

        const responseMedias =
          imagesToSubmit.length > 0 &&
          (await Media.create({
            data: imagesToSubmit,
          }));

        console.log("response media", responseMedias);
      }
    }

    revalidatePath("/", "layout");

    return {
      success: "Blog created successfully",
      data: response,
    };
  } catch (error) {
    // return { error: "Something went wrong", data: error };
    console.log(error)
  }
}
