import React from "react";
import Image from "next/image";
import { classNames } from "../../../../utils/classNames";
import { CategoriesDataType } from "../../../../lib/getReformattedData";

import { MenuBlockSection } from "./MenuBlockSection";
import { SecondaryButton } from "../../../buttons/SecondaryButton";
import { SignUpButton } from "../../../buttons/SignUpButton";
import { AccountBlockButton } from "../../../buttons/AccountBlockButton";
import { SearchInput } from "../../../inputs/SearchInput";

interface Props {
  buttonOnClick: () => void;
  isLoggedIn: boolean;
  transition: boolean;
  categories?: CategoriesDataType[];
}

export const MobileMenu = ({
  buttonOnClick,
  isLoggedIn,
  transition,
  categories,
}: Props) => {
  const accountButtons = [
    { type: "menuLink", to: "/account", title: "My account" },
    { type: "menuLink", to: "/posts", title: "My posts" },
    { type: "menuLink", to: "/saved", title: "Saved" },
    { type: "menuLink", to: "/api/logout", title: "Log Out" },
  ];

  return (
    <div
      className={classNames(
        "absolute left-0 top-0 z-10 h-1/2 w-full overflow-auto rounded-b-xl bg-white pb-3 transition duration-500 sm:hidden",
        transition ? "translate-y-0 shadow-xl" : "-translate-y-full"
      )}
    >
      <button className="ml-2 mt-2" onClick={buttonOnClick}>
        <Image
          src={"/images/close.svg"}
          height={35}
          width={35}
          alt={"Icons for closing the menu"}
        />
      </button>

      {categories && (
        <MenuBlockSection title="Categories">
          <SearchInput styles="w-full" />
          {categories.map((category) => (
            <AccountBlockButton
              key={category.id}
              {...category}
              type="menuButton"
            />
          ))}
        </MenuBlockSection>
      )}
      {isLoggedIn ? (
        <MenuBlockSection title="Account">
          {accountButtons.map((button) => (
            <AccountBlockButton
              key={button.title}
              {...button}
              type="menuLink"
            />
          ))}
        </MenuBlockSection>
      ) : (
        <div className={"mx-auto flex w-5/6 items-center justify-between"}>
          <SecondaryButton to="/login" title={"Log In"} type={"link"} />
          <SignUpButton to="/signup" />
        </div>
      )}
    </div>
  );
};
