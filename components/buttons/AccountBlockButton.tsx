import Link from "next/link";
import { classNames } from "../../utils/classNames";
import React from "react";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  selectFilter,
  setActiveCategory,
} from "../../redux/slices/filterSlice";

interface CommonAccountBlockButtonProps {
  title: string;
}

interface AccountBlockButtonProps extends CommonAccountBlockButtonProps {
  type: "button";
  to?: never;
  id?: never;
}

interface NavLinkAccountBlockButtonProps extends CommonAccountBlockButtonProps {
  type: "link";
  to: string;
  id?: never;
}

interface MenuLinkAccountBlockButtonProps
  extends CommonAccountBlockButtonProps {
  type: "menuLink";
  to: string;
  id?: never;
}

interface MenuButtonAccountBlockButtonProps
  extends CommonAccountBlockButtonProps {
  type: "menuButton";
  to?: never;
  id: number;
}

type AllAccountBlockButtonProps =
  | AccountBlockButtonProps
  | NavLinkAccountBlockButtonProps
  | MenuLinkAccountBlockButtonProps
  | MenuButtonAccountBlockButtonProps;

export const AccountBlockButton = ({
  title,
  type,
  to,
  id,
}: AllAccountBlockButtonProps) => {
  const dispatch = useAppDispatch();
  const { activeCategory } = useSelector(selectFilter);
  switch (type) {
    case "button":
      return (
        <button className="my-1 w-full rounded-lg bg-gray-100 py-1 px-4">
          {title}
        </button>
      );
    case "link":
      return (
        <Link href={to}>
          <a className="flex items-center justify-center rounded-lg px-4 text-lg text-black-200 hover:bg-pale-blue hover:text-white">
            <p className="px-0 py-1">{title}</p>
          </a>
        </Link>
      );
    case "menuLink":
      return (
        <Link href={to}>
          <a className="flex h-8 w-full items-center justify-center rounded-lg bg-gray-100 py-1">
            <p className="px-0 py-1">{title}</p>
          </a>
        </Link>
      );
    case "menuButton":
      return (
        <button
          onClick={() => dispatch(setActiveCategory(id))}
          className={classNames(
            "flex h-8 w-full items-center justify-center rounded-lg bg-gray-100 py-1",
            activeCategory === id ? "activeButton" : ""
          )}
        >
          {title}
        </button>
      );
    default:
      return <p>Button type is not valid</p>;
  }
};
