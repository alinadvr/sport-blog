import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import axios from "axios";

interface LikeButtonProps {
  size: string;
  likes: number[];
  userId: number | undefined;
  postId: number;
}

export const LikeButton = ({
  size,
  likes,
  userId,
  postId,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(
    userId ? likes.includes(userId) : false
  );
  const [likesAmount, setLikesAmount] = useState(likes);

  const router = useRouter();

  async function handleClick() {
    if (userId) {
      let updatedLikes: number[];
      if (likesAmount.includes(userId)) {
        updatedLikes = likesAmount.filter((user) => user !== userId);
      } else {
        updatedLikes = [...likesAmount, userId];
      }

      await axios
        .post("/api/changePost", {
          updatedLikes,
          postId,
        })
        .then(() => {
          setIsLiked((prevState) => !prevState);
          setLikesAmount(updatedLikes);
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
        });
    } else {
      await router.push("/login");
    }
  }

  switch (size) {
    case "small":
      return (
        <button onClick={handleClick}>
          {isLiked ? (
            <HeartIconSolid className="w-8 text-red-400" />
          ) : (
            <HeartIconOutline className="w-8 text-black" />
          )}
        </button>
      );
    case "large":
      return (
        <div className="flex w-14 items-center justify-between">
          <button onClick={handleClick}>
            {isLiked ? (
              <HeartIconSolid className="w-[2.3rem] text-red-400" />
            ) : (
              <HeartIconOutline className="w-[2.3rem] text-black" />
            )}
          </button>
          <h2 className="font-medium">{likesAmount.length}</h2>
        </div>
      );
    default:
      return <p>Button type is not valid</p>;
  }
};
