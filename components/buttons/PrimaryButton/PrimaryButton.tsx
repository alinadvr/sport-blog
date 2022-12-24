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
            "h-12 w-28 rounded-full bg-blue font-medium text-white",
            disabled
              ? "opacity-50"
              : "bg-blue hover:border-2 hover:border-blue hover:bg-white hover:text-blue"
          )}
          disabled={disabled || isLoading}
        >
          {isLoading ? <LoadingAnimation /> : title}
        </button>
      );
    case "link":
      return (
        <Link href={to}>
          <a className="flex h-12 w-full items-center justify-center rounded-full bg-blue font-medium text-white hover:border-2 hover:border-blue hover:bg-white hover:text-blue sm:w-44">
            {title}
          </a>
        </Link>
      );
    default:
      return <p>Button type not valid</p>;
  }
};
