import Link from "next/link";
import Image from "next/image";

import { LikeButton } from "../../../../components/buttons/LikeButton";
import { SaveButton } from "../../../../components/buttons/SaveButton";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Remarkable } from "remarkable";
import { useMemo } from "react";

interface PostProps {
  id: number;
  title: string;
  author: string;
  authorId: number;
  image: string;
  category: string;
  likes: number[];
  saved: number[];
  text: string;
  userId: number | undefined;
}

export const Post = ({
  id,
  title,
  author,
  authorId,
  image,
  category,
  likes,
  saved,
  text,
  userId,
}: PostProps) => {
  if (text.length > 400) {
    text = text.slice(0, 400).concat("...");
  }
  const md = new Remarkable();
  const markdownToHTML = useMemo(() => md.render(text), [text]);

  return (
    <div className="rounded-xl bg-white">
      <div className="relative h-64 sm:h-80">
        <Image
          src={`/images/posts/${image}`}
          alt="Post image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="grid gap-3 p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center justify-between text-gray-400">
          <Link href={`/account/${authorId}`}>
            <a className="hover:underline">{author}</a>
          </Link>
          <p className="rounded-full bg-red-400 py-1.5 px-3 text-white">
            {category}
          </p>
        </div>
        <div
          className="text-gray-400"
          dangerouslySetInnerHTML={{ __html: markdownToHTML }}
        />
        <div className="justify-between sm:flex">
          <Link href={`/post/${id}`}>
            <a className="flex items-center">
              <p className="text-lg text-red-400 sm:text-xl">Read article</p>
              <ArrowLongRightIcon className="w-8 text-red-400" />
            </a>
          </Link>
          <div className="flex w-28 items-center justify-between sm:w-32">
            <LikeButton
              size="large"
              likes={likes}
              userId={userId}
              postId={id}
            />
            <SaveButton
              size="large"
              saved={saved}
              userId={userId}
              postId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
