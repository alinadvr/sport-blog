import Link from "next/link";
import { classNames } from "../../../utils/classNames";
import React from "react";
import { LoadingAnimation } from "../../layout/LoadingAnimation";

interface CommonSecondaryButtonProps {
  title: string;
}

interface SecondaryButtonProps extends CommonSecondaryButtonProps {
  type: "button";
  buttonType: "button" | "submit" | "reset";
  to?: never;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  isLoading?: boolean;
}

interface NavLinkSecondaryButtonProps extends CommonSecondaryButtonProps {
  type: "link";
  to: string;
  children?: React.ReactNode;
  disabled?: never;
  onClick?: never;
  isLoading?: never;
  buttonType?: never;
}

type AllSecondaryButtonProps =
  | SecondaryButtonProps
  | NavLinkSecondaryButtonProps;

export const SecondaryButton = ({
  to,
  buttonType,
  title,
  type,
  children,
  disabled,
  onClick,
  isLoading,
}: AllSecondaryButtonProps) => {
  switch (type) {
    case "link":
      return (
        <Link href={to}>
          <a className="flex h-12 w-32 items-center justify-center rounded-xl bg-white text-center text-lg text-gray-600 transition-all hover:border-2 hover:border-blue-400">
            {title}
            {children}
          </a>
        </Link>
      );
    case "button":
      return (
        <button
          type={buttonType}
          className={classNames(
            "flex h-12 w-32 items-center justify-center rounded-xl bg-white text-center text-lg text-gray-600 transition-all hover:border-2 hover:border-blue-400",
            disabled ? "opacity-50" : ""
          )}
          disabled={disabled || isLoading}
          onClick={onClick}
        >
          {isLoading ? <LoadingAnimation /> : title}
        </button>
      );
    default:
      return <p>Button type is not valid</p>;
  }
};
