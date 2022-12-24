import { useMemo } from "react";
import { Remarkable } from "remarkable";
import Link from "next/link";
import Image from "next/image";
import { CommentsComponentDataType } from "../../../../lib/getReformattedData";

import { transformDate } from "../../../../utils/transformDate";

import { LikeButton } from "../../../../components/buttons/LikeButton";
import { SaveButton } from "../../../../components/buttons/SaveButton";
import { Comment } from "../Comment";
import { CommentInputField } from "../../../../components/inputs/CommentInputField";

interface OnePostProps {
  id: number;
  date: string;
  title: string;
  author: string;
  authorId: number;
  image: string;
  category: string;
  likes: number[];
  saved: number[];
  text: string;
  comments: CommentsComponentDataType[];
  userId: number | undefined;
}

export const OnePost = ({
  id,
  date,
  title,
  author,
  authorId,
  image,
  category,
  likes,
  saved,
  text,
  comments,
  userId,
}: OnePostProps) => {
  const md = new Remarkable();
  const markdownToHTML = useMemo(() => md.render(text), [text]);

  return (
    <div className="post">
      <h1 className="text-4xl font-bold tracking-tighter">{title}</h1>
      <div className="flex justify-between text-gray-300">
        <p>{transformDate(date)}</p>
        <Link href={`/account/${authorId}`}>
          <a className="hover:underline">{author}</a>
        </Link>
      </div>
      <div className="mx-auto rounded-xl">
        <div className="relative mx-auto h-[300px]" style={{ height: 400 }}>
          <Image
            src={image.startsWith("http") ? image : `/images/posts/${image}`}
            alt="Post image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-xl"
          />
        </div>
        <div className="text-gray my-2 flex items-center justify-between">
          <div
            className="rounded-full bg-red p-2 text-white"
            style={{
              backgroundColor: "#FB7777",
            }}
          >
            {category}
          </div>
          <div className="flex w-28 items-center justify-between text-black sm:w-72">
            <LikeButton
              likes={likes}
              size={"large"}
              userId={userId}
              postId={id}
            />
            <SaveButton
              saved={saved}
              size={"large"}
              userId={userId}
              postId={id}
            />
          </div>
        </div>
        <div
          className="text-left text-xl text-black"
          dangerouslySetInnerHTML={{ __html: markdownToHTML }}
        />
      </div>
      <CommentInputField postId={id} userId={userId} />
      {!comments.length ? (
        <p className="my-6 text-lg text-gray-300">No comments yet..</p>
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} {...comment} userId={comment.user_id} />
        ))
      )}
    </div>
  );
};
