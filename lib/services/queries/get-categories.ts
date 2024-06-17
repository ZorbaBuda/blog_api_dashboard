import { PER_PAGE } from "@/config";
import connect from "@/lib/db";
import Category from "@/lib/models/category";
import { ICategoryDocument } from "@/lib/models/category";
import escapeStringRegexp from "escape-string-regexp";

export async function getCategories({
  userId,
  sortBy,
  orderBy,
  limitNumber,
  pageNumber,
  categoryName,
}: {
  userId: string;
  sortBy?: string;
  orderBy?: string;
  limitNumber?: number;
  pageNumber?: number;
  categoryName?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const escapedCategoryName = categoryName && escapeStringRegexp(categoryName);

  const sortCase = () => {
    switch (sortBy) {
      case "name":
        return {
          categoryName: orderBy,
        };
      case "slug":
        return {
          slug: orderBy,
        };
      case "description":
        return {
          description: orderBy,
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
  
  const categories = await Category.find({
    orderBy: sorting || {
      createdAt: "desc",
    },
    where: {
      userId: userId,
      categoryName: {
        startsWith: escapedCategoryName,
        mode: "insensitive",
      },
    },

    take: take,
    skip: skip,
  });

  const categoriesCount = await Category.countDocuments({
    where: {
      userId: userId,
      categoryName: {
        startsWith: escapedCategoryName,
        mode: "insensitive",
      },
    },
  });

  return { categories, categoriesCount };
}
