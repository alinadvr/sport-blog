import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMemo } from "react";

import { Remarkable } from "remarkable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { LikeButton } from "../../../../components/buttons/LikeButton";
import { SaveButton } from "../../../../components/buttons/SaveButton";

interface SmallPostProps {
  isUserPosts: boolean;
  id: number;
  title: string;
  author: string;
  authorId: number;
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
  authorId,
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
    let status = false;
    await axios
      .post("/api/post/delete", { id, image })
      .then(() => (status = true))
      .catch((error) => toast.error(`Error: ${error.message}`));

    if (status) {
      await router.reload();
    }
  };

  return (
    <div>
      <div className="rounded-xl bg-white">
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
        <div className="flex flex-col justify-between p-2.5">
          <div className="grid gap-1">
            <h1 className="text-xl font-bold">{title}</h1>
            <Link href={`/account/${authorId}`}>
              <a className="text-gray-400 hover:underline">{author}</a>
            </Link>
            <div
              className="max-h-40 overflow-hidden text-gray-400"
              dangerouslySetInnerHTML={{ __html: markdownToHTML }}
            />
          </div>

          <div className="flex justify-between">
            <Link href={`/post/${id}`}>
              <a className="mr-2 flex items-center text-lg text-red-400">
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
        <div className="flex w-full justify-end">
          <div className="mt-2 flex w-24 justify-between">
            <Link href={`post/edit/${id}`}>
              <PencilSquareIcon className="w-10 cursor-pointer rounded-full bg-white p-2 text-gray-400 transition-all hover:text-gray-700" />
            </Link>
            <button type="button" onClick={handleDeletePost}>
              <TrashIcon className="w-10 cursor-pointer rounded-full bg-white p-2 text-gray-400 transition-all hover:text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
