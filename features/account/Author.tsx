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
    <div className="mx-auto w-3/4">
      <div className="mt-8 justify-items-start sm:flex">
        <div className="mx-auto flex w-2/3 flex-col items-center sm:w-fit">
          <Image
            src={image || "/images/avatar.svg"}
            width={250}
            height={250}
            alt="User's avatar"
            layout="fixed"
            className="rounded-full"
          />
        </div>
        <div className="w-9/12 sm:ml-6">
          <p className="mr-3 text-center text-3xl text-black-200 sm:text-left">
            {nickname}
          </p>
          <p className="mr-3 block text-gray">{description}</p>
        </div>
      </div>
      <div className="mt-6 mb-3 h-0.5 w-full rotate-180 bg-gray-200" />
      <div className="grid-cols-3 gap-x-10 gap-y-6 sm:grid">
        {userPosts.map((post) => (
          <SmallPost
            key={post.id}
            isUserPosts={false}
            id={post.id}
            title={post.title}
            author={post.author}
            image={post.image}
            text={post.text}
            likes={post.likes_user_id}
            saved={post.saved_user_id}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};
