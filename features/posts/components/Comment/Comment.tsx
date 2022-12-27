import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface CommentProps {
  id: number;
  user: string;
  userId: number;
  userImage: string;
  text: string;
  currentUserId: number | undefined;
}

export const Comment = ({
  id,
  user,
  userId,
  userImage,
  text,
  currentUserId,
}: CommentProps) => {
  const router = useRouter();

  async function handleDeleteComment() {
    let status = false;
    await axios
      .post("/api/comment/delete", { id })
      .then(() => (status = true))
      .catch((error) => toast.error(`Error: ${error.message}`));

    if (status) {
      await router.reload();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-[50px] w-[55px]">
        <Image
          src={
            userImage ? `/images/avatars/${userImage}` : "/images/avatar.svg"
          }
          alt="User's avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          quality={100}
        />
      </div>
      <div className="w-full text-left">
        <Link href={`/account/${userId}`}>
          <a className="text-gray-400">{user || "Deleted user"}</a>
        </Link>
        <p className="text-lg text-black">{text}</p>
      </div>
      {userId === currentUserId && (
        <TrashIcon
          className="w-5 cursor-pointer text-gray-400 transition-all duration-500 hover:text-gray-600"
          onClick={handleDeleteComment}
        />
      )}
    </div>
  );
};
