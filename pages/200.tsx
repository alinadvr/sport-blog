import { NextPage } from "next";
import Link from "next/link";

const Success: NextPage = () => {
  return (
    <div className={"flex h-screen flex-col items-center justify-center"}>
      <h1 className={"text-3xl"}>Successfully completed</h1>
      <Link href={"/"}>
        <a className={"text-blue underline"}>Return to main page</a>
      </Link>
    </div>
  );
};

export default Success;
