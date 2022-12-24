import Link from "next/link";

interface SignUpButtonProps {
  to: string;
}

export const SignUpButton = ({ to }: SignUpButtonProps) => {
  return (
    <Link href={to}>
      <a className="mr-1 flex h-12 w-1/2 items-center justify-center rounded-xl bg-blue text-center text-lg text-white">
        Sign Up
      </a>
    </Link>
  );
};
