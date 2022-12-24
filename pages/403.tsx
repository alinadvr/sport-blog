import { NextPage } from "next";
import Link from "next/link";

const AccessDenied: NextPage = () => {
  return (
    <div className={"flex h-screen flex-col items-center justify-center"}>
      <h1 className={"text-3xl"}>Error 403 - Forbidden</h1>
      <p className={"text-gray"}>
        You do not have permission to access on this server
      </p>
      <Link href={"/"}>
        <a className={"text-blue underline"}>Return to main page</a>
      </Link>
    </div>
  );
};

export default AccessDenied;
