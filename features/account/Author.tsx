import Image from "next/image";
import { PostComponentDataType } from "../../lib/getReformattedData";

import { SmallPost } from "../posts/components/SmallPost";

interface AuthorProps {
  userId: number;
  nickname: string;
  image: string;
  description?: string;
  userPosts: PostComponentDataType[];
}

export const Author = ({
  userId,
  nickname,
  image,
  description,
  userPosts,
}: AuthorProps) => {
  return (
    <div className="mx-auto grid w-3/4 gap-5">
      <div className="rounded-xl bg-white p-4 sm:flex">
        <div className="flex items-center">
          <Image
            src={image ? `/images/avatars/${image}` : "/images/avatar.svg"}
            width={230}
            height={230}
            alt="User's avatar"
            layout="fixed"
            objectFit="cover"
            className="rounded-full"
            quality={100}
          />
        </div>
        <div className="ml-4 w-full">
          <p className="text-3xl tracking-tight">{nickname}</p>
          <p className="text-gray-400">Posts amount: {userPosts.length}</p>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="h-[1px] w-full rotate-180 bg-gray-300" />
      <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 2xl:grid-cols-4">
        {userPosts.map((post) => (
          <SmallPost
            key={post.id}
            isUserPosts={false}
            {...post}
            authorId={post.author_id}
            likes={post.likes_user_id}
            saved={post.saved_user_id}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};
