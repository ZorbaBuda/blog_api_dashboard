
import connect from "@/lib/db";
import Media from "@/lib/models/media";

export async function getMedias({ userId }: { userId: string }) {

  await connect() 

  const medias = await Media.find({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const mediasCount = await Media.countDocuments({
    where: {
      userId: userId,
    },
  });

  return { medias, mediasCount };
}
