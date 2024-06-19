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
    const orderByNum = orderBy == "asc" ? 1 : -1
    switch (sortBy) {
      case "title":
        return {
          title: orderByNum,
        };
      case "author":
        return {
          author: orderByNum,
        };
      case "metaDescription":
        return {
          metaDescription: orderByNum,
        };
      case "views":
        return {
          blogViews: {
            _count: orderByNum,
          },
        };
      case "status":
        return {
          published: orderByNum,
        };
      case "created at":
        return {
          createdAt: orderByNum,
        };

      default:
        break;
    }
  };

  const sorting = sortCase() as any;

  // console.log(sortBy)
  // console.log(orderBy)
  // console.log(sorting)

  const take = limitNumber || PER_PAGE;
  const skip = (currentPage - 1) * (limitNumber || PER_PAGE) || 0;

  await connect()

  const blogsResponse = await Blog.find({userId: userId})
  .skip(skip)
  .limit(take)
  .sort(sorting)

  // console.log(' 😒', blogsResponse)
  // const blogs = await Blog.find({
  //   orderBy: sorting || {
  //     createdAt: "desc",
  //   },
  //   where: {
  //     userId: userId,
  //     title: {
  //       startsWith: escapedTitle,
  //       mode: "insensitive",
  //     },
  //   },
  //   select: {
  //     id: true,
  //     slug: true,
  //     title: true,
  //     author: true,
  //     metaDescription: true,
  //     published: true,
  //     createdAt: true,
  //     updatedAt: true,
  //     categories: true,
  //     _count: {
  //       select: {
  //         blogViews: true,
  //       },
  //     },
  //     featuredImage: {
  //       select: {
  //         imageUrl: true,
  //         imageTitle: true,
  //         altText: true,
  //       },
  //     },
  //   },

  //   take: take,
  //   skip: skip,
  // });

  // console.log("blogs", blogs);

   const blogsCount = await Blog.countDocuments({userId : userId});

  // const blogsCount = await Blog.countDocuments({
  //   where: {
  //     userId: userId,
  //     title: {
  //       startsWith: escapedTitle,
  //       mode: "insensitive",
  //     },
  //   },
  // });

//   const blogsCount = await prisma.blog.count({
//     where: {
//       userId: userId,
//       title: {
//         startsWith: escapedTitle,
//         mode: "insensitive",
//       },
//     },
//   });

const blogs = JSON.parse(JSON.stringify(blogsResponse))

  return { blogs, blogsCount };
}

// export type BlogQueryProps = Prisma.PromiseReturnType<
//   typeof getBlogs
// >["blogs"][number];
