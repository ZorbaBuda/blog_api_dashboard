import connect from "@/lib/db";
import Blog from "@/lib/models/blog";


export async function getSingleBlog({
  decodedSlug,
  userId,
}: {
  decodedSlug: string;
  userId: string;
}) {

  await connect() 

  const blog = await Blog.find({userId: userId, slug: decodedSlug})
  // const blog = await prisma.blog.findFirst({
  //   where: {
  //     userId: userId,
  //     slug: decodedSlug,
  //   },
  // });

  return { blog };
}
