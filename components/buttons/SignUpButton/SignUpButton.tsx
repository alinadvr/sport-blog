import Link from "next/link";

interface SignUpButtonProps {
  to: string;
}

export const SignUpButton = ({ to }: SignUpButtonProps) => {
  return (
    <Link href={to}>
      <a className="ml-2 flex h-12 w-32 items-center justify-center rounded-xl bg-blue-400 text-center text-lg text-white">
        Sign Up
      </a>
    </Link>
  );
};
