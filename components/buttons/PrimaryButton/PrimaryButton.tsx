import Link from "next/link";
import { classNames } from "../../../utils/classNames";

import { LoadingAnimation } from "../../layout/LoadingAnimation";

interface CommonPrimaryButtonProps {
  title: string;
}

interface PrimaryButtonProps extends CommonPrimaryButtonProps {
  type: "button";
  buttonType: "button" | "submit" | "reset";
  to?: never;
  onClick?: () => void;
  disabled: boolean;
  isLoading?: boolean;
}

interface LinkPrimaryButtonProps extends CommonPrimaryButtonProps {
  type: "link";
  to: string;
  buttonType?: never;
  onClick?: never;
  disabled?: never;
  isLoading?: never;
}

type AllPrimaryButtonProps = PrimaryButtonProps | LinkPrimaryButtonProps;

export const PrimaryButton = ({
  type,
  buttonType,
  title,
  to,
  onClick,
  disabled,
  isLoading,
}: AllPrimaryButtonProps) => {
  switch (type) {
    case "button":
      return (
        <button
          type={buttonType}
          onClick={(event) => {
            event.preventDefault();
            onClick && onClick();
          }}
          className={classNames(
            "h-12 w-28 rounded-full bg-blue-400 font-medium text-white transition-all",
            disabled
              ? "opacity-50"
              : "bg-blue-400 hover:border-2 hover:border-blue-400 hover:bg-white hover:text-blue-400"
          )}
          disabled={disabled || isLoading}
        >
          {isLoading ? <LoadingAnimation /> : title}
        </button>
      );
    case "link":
      return (
        <Link href={to}>
          <a className="flex h-10 w-full items-center justify-center rounded-full bg-blue-400 font-medium text-white transition-all hover:border-2 hover:border-blue-400 hover:bg-white hover:text-blue-400 sm:w-40">
            {title}
          </a>
        </Link>
      );
    default:
      return <p>Button type not valid</p>;
  }
};
