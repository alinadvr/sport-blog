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
    <div className="flex items-center">
      <div className="relative h-12 w-12">
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
      <div className="ml-2 w-5/6 text-left sm:w-full">
        <Link href={`/account/${userId}`}>
          <a className="text-gray-400">{user || "Deleted user"}</a>
        </Link>
        <p className="text-lg text-black">{text}</p>
      </div>
    </div>
  );
};
