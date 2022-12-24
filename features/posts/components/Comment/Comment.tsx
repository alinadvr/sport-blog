import Image from "next/image";
import Link from "next/link";

interface CommentProps {
  user: string;
  userId: number;
  userImage: string;
  text: string;
}

export const Comment = ({ user, userId, userImage, text }: CommentProps) => {
  return (
    <div className="flex">
      <div>
        <div style={{ height: 50, width: 50, position: "absolute" }}>
          <Image
            src={
              userImage ? `/images/avatars/${userImage}` : "/images/avatar.svg"
            }
            alt="User's avatar"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>
      <div className="ml-3 w-5/6 text-left sm:w-full">
        <Link href={`/account/${userId}`}>
          <a className="text-lg text-gray-300">{user || "Deleted user"}</a>
        </Link>
        <p className="text-lg text-black">{text}</p>
      </div>
    </div>
  );
};
