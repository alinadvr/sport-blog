import { useState } from "react";
import { useRouter } from "next/router";
import { classNames } from "../../../utils/classNames";
import { toast } from "react-toastify";

interface CommentInputFieldProps {
  postId: number;
  userId: number | undefined;
}

export const CommentInputField = ({
  postId,
  userId,
}: CommentInputFieldProps) => {
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (userId) {
      const response = await fetch("/api/addComment", {
        method: "POST",
        body: JSON.stringify({ userId, postId, text: commentText }),
      });

      if (response.ok) {
        await router.reload();
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } else {
      await router.push("/login");
    }
  }

  return (
    <div className="relative">
      <input
        className="h-12 w-full rounded-full border pl-3 text-lg outline-none transition-all focus:border-2 focus:border-blue-400"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={!commentText}
        className={classNames(
          "absolute right-2 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-400 transition-all duration-300",
          commentText ? "hover:bg-blue-400 hover:text-white" : ""
        )}
      >
        S
      </button>
    </div>
  );
};
