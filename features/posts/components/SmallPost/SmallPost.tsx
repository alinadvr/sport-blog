import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { Remarkable } from "remarkable";

import { PencilIcon } from "@heroicons/react/24/outline";
import { LikeButton } from "../../../../components/buttons/LikeButton";
import { SaveButton } from "../../../../components/buttons/SaveButton";
import { SecondaryButton } from "../../../../components/buttons/SecondaryButton";

interface SmallPostProps {
  isUserPosts: boolean;
  id: number;
  title: string;
  author: string;
  text: string;
  image: string;
  likes: number[];
  saved: number[];
  userId: number | undefined;
}

export const SmallPost = ({
  isUserPosts,
  id,
  title,
  author,
  text,
  image,
  likes,
  saved,
  userId,
}: SmallPostProps) => {
  if (title.length > 50) {
    title = title.slice(0, 45).concat("...");
  }
  if (text.length > 150) {
    text = text.slice(0, 150).concat("...");
  }
  const md = new Remarkable();
  const markdownToHTML = useMemo(() => md.render(text), [text]);
  const router = useRouter();

  const handleDeletePost = async () => {
    const response = await fetch("/api/post/delete", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      await router.reload();
    } else {
      toast.error(`Error: ${response.statusText}`);
    }
  };
  console.log(image);

  return (
    <div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="relative h-64 w-full">
          <Image
            src={`/images/posts/${image}`}
            layout="fill"
            alt="Post image"
            className="rounded-xl"
            objectFit="cover"
            quality={100}
          />
        </div>
        {/*m-10 and height doesn't work*/}
        <div
          style={{ height: 200, margin: 10 }}
          className="flex flex-col justify-between overflow-hidden"
        >
          <div className="grid gap-1">
            <h1 className="text-xl font-bold">{title}</h1>
            <Link href={`/account/`}>
              <a className="text-gray-300 hover:underline">{author}</a>
            </Link>
            <div
              className="mb-2 text-gray-300"
              dangerouslySetInnerHTML={{ __html: markdownToHTML }}
            />
          </div>

          <div className="flex justify-between">
            <Link href={`/post/${id}`}>
              <a className="mr-2 flex items-center text-lg text-red">
                Read article
              </a>
            </Link>
            <div className="flex w-20 items-center justify-around">
              <LikeButton
                likes={likes}
                size="small"
                userId={userId}
                postId={id}
              />
              <SaveButton
                saved={saved}
                size="small"
                userId={userId}
                postId={id}
              />
            </div>
          </div>
        </div>
      </div>
      {isUserPosts && (
        <div className="flex justify-between">
          <div className="mt-2 flex w-full">
            <SecondaryButton to={`post/edit/${id}`} title="Edit" type="link">
              <PencilIcon
                className="cursor-pointer"
                style={{ width: 20, marginLeft: 10 }}
              />
            </SecondaryButton>
            <SecondaryButton
              title="Delete"
              type="button"
              onClick={handleDeletePost}
              buttonType="button"
            />
          </div>
        </div>
      )}
    </div>
  );
};
