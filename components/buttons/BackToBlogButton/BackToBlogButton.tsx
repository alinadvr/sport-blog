import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export const BackToBlogButton = () => {
  return (
    <div className="mx-auto block flex w-5/6">
      <Link href="/">
        <a className="flex w-44 cursor-pointer items-center">
          <ArrowLongLeftIcon className="w-8 text-red-400" />
          <h1 className="ml-1 text-lg text-red-400">Back to blog</h1>
        </a>
      </Link>
    </div>
  );
};
