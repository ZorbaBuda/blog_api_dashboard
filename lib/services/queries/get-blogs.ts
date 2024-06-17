import connect from "../../db";
import type { IUser, IUserDocument } from "../../models/user";
import Blog from "../../models/blog";

import { PER_PAGE } from "@/config";
import escapeStringRegexp from "escape-string-regexp";

export async function getBlogs({
  userId,
  sortBy,
  orderBy,
  limitNumber,
  pageNumber,
  title,
}: {
  userId: string;
  sortBy?: string;
  orderBy?: string;
  limitNumber?: number;
  pageNumber?: number;
  title?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const escapedTitle = title && escapeStringRegexp(title);

  const sortCase = () => {
    switch (sortBy) {
      case "title":
        return {
          title: orderBy,
        };
      case "author":
        return {
          author: orderBy,
        };
      case "metaDescription":
        return {
          metaDescription: orderBy,
        };
      case "views":
        return {
          blogViews: {
            _count: orderBy,
          },
        };
      case "status":
        return {
          published: orderBy,
        };
      case "created at":
        return {
          createdAt: orderBy,
        };

      default:
        break;
    }
  };

  const sorting = sortCase() as any;

  const take = limitNumber || PER_PAGE;
  const skip = (currentPage - 1) * (limitNumber || PER_PAGE) || 0;

  await connect()

  const blogs = await Blog.find({
    orderBy: sorting || {
      createdAt: "desc",
    },
    where: {
      userId: userId,
      title: {
        startsWith: escapedTitle,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      author: true,
      metaDescription: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      categories: true,
      _count: {
        select: {
          blogViews: true,
        },
      },
      featuredImage: {
        select: {
          imageUrl: true,
          imageTitle: true,
          altText: true,
        },
      },
    },

    take: take,
    skip: skip,
  });

  // console.log("blogs", blogs);

  const blogsCount = await Blog.countDocuments({
    where: {
      userId: userId,
      title: {
        startsWith: escapedTitle,
        mode: "insensitive",
      },
    },
  });

//   const blogsCount = await prisma.blog.count({
//     where: {
//       userId: userId,
//       title: {
//         startsWith: escapedTitle,
//         mode: "insensitive",
//       },
//     },
//   });

  return { blogs, blogsCount };
}

// export type BlogQueryProps = Prisma.PromiseReturnType<
//   typeof getBlogs
// >["blogs"][number];
