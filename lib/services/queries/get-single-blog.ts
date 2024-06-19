import connect from "@/lib/db";
import Blog, { IBlogDocument } from "@/lib/models/blog";


export async function getSingleBlog({
  decodedSlug,
  userId,
}: {
  decodedSlug: string;
  userId: string;
}) {

  await connect() 

  const response  = await Blog.findOne({userId: userId, slug: decodedSlug})
  // const blog = await prisma.blog.findFirst({
  //   where: {
  //     userId: userId,
  //     slug: decodedSlug,
  //   },
  // });

  // console.log(blog)

   const blog = JSON.parse(JSON.stringify(response))

  return { response };
}
