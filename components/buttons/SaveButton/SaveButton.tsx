import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

interface SaveButtonProps {
  size: string;
  saved: number[];
  userId: number | undefined;
  postId: number;
}

export const SaveButton = ({
  size,
  saved,
  userId,
  postId,
}: SaveButtonProps) => {
  const [isSaved, setIsSaved] = useState(
    userId ? saved.includes(userId) : false
  );
  const [savedAmount, setSavedAmount] = useState(saved);
  const router = useRouter();

  async function handleClick() {
    if (userId) {
      let updatedSaved;
      if (savedAmount.includes(userId)) {
        updatedSaved = savedAmount.filter((user) => user !== userId);
      } else {
        updatedSaved = [...savedAmount, userId];
      }

      const response = await fetch("/api/changePost", {
        method: "POST",
        body: JSON.stringify({ updatedSaved, postId }),
      });

      if (response.ok) {
        setIsSaved((prevState) => !prevState);
        setSavedAmount(updatedSaved);
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } else {
      await router.push("/login");
    }
  }

  switch (size) {
    case "small":
      return (
        <button onClick={handleClick}>
          {isSaved ? (
            <BookmarkIconSolid className="w-8 text-black" />
          ) : (
            <BookmarkIconOutline className="w-8 text-black" />
          )}
        </button>
      );
    case "large":
      return (
        <div className="flex w-12 items-center justify-between">
          <button onClick={handleClick}>
            {isSaved ? (
              <BookmarkIconSolid className="w-8 text-black" />
            ) : (
              <BookmarkIconOutline className="w-8 text-black" />
            )}
          </button>
          <h2 className="font-medium">{savedAmount.length}</h2>
        </div>
      );
    default:
      return <p>Button type not valid</p>;
  }
};
