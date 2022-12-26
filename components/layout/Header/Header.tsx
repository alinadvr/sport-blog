import React from "react";
import Image from "next/image";

import {
  CategoriesDataType,
  PostComponentDataType,
} from "../../../lib/getReformattedData";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { SignUpButton } from "../../buttons/SignUpButton";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { DesktopMenu } from "../Navbar/DesktopMenu";
import { MobileMenu } from "../Navbar/MobileMenu";
import { SearchInput } from "../../inputs/SearchInput";
import { classNames } from "../../../utils/classNames";

interface Props {
  isLoggedIn: boolean;
  categories?: CategoriesDataType[];
  setPostsByParameter?: (posts: PostComponentDataType[]) => void;
  allPosts?: PostComponentDataType[];
  userAvatar?: string;
}

export const Header = ({ isLoggedIn, categories, userAvatar }: Props) => {
  const [isBlockVisible, setIsBlockVisible] = React.useState(false);

  const accountBlockDesktopRef = React.useRef<HTMLInputElement>(null);
  const accountBlockMobileRef = React.useRef<HTMLInputElement>(null);

  const handleOutsideClick = (event: any) => {
    if (
      !event.path.includes(accountBlockDesktopRef.current) &&
      !event.path.includes(accountBlockMobileRef.current)
    ) {
      setIsBlockVisible(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="border-b-2 border-gray-200 bg-white">
      <div className="mx-auto w-5/6">
        <header className="my-2 flex items-center justify-between">
          <h1 className="inline cursor-default text-4xl tracking-tighter text-gray-300">
            LOGO
          </h1>

          {categories && (
            <div className="mx-auto hidden sm:block">
              <SearchInput styles="w-72 md:w-96" />
            </div>
          )}

          {/****************** Mobile Version ******************/}
          <div ref={accountBlockMobileRef}>
            <button
              className="hover:border-blue flex h-12 w-12 items-center justify-center hover:rounded-xl hover:border-2 sm:hidden"
              onClick={() => setIsBlockVisible(true)}
            >
              <Bars3Icon />
            </button>
            <MobileMenu
              isLoggedIn={isLoggedIn}
              buttonOnClick={() => {
                setIsBlockVisible(false);
              }}
              transition={isBlockVisible}
              categories={categories}
            />
          </div>

          {/****************** Desktop Version ******************/}
          {isLoggedIn ? (
            <div
              className="hidden flex-col sm:flex"
              ref={accountBlockDesktopRef}
            >
              <button
                className="flex items-center"
                onClick={() => setIsBlockVisible((prevState) => !prevState)}
              >
                <Image
                  src={
                    userAvatar
                      ? `/images/avatars/${userAvatar}`
                      : "/images/avatar.svg"
                  }
                  width={60}
                  height={60}
                  alt="Avatar Icon"
                  className="rounded-full"
                  objectFit="cover"
                  quality={100}
                />
              </button>
              <div
                className={classNames(
                  "flex-col items-center transition-all duration-200 sm:flex",
                  isBlockVisible ? "opacity-100" : "opacity-0"
                )}
              >
                {isBlockVisible && <DesktopMenu />}
              </div>
            </div>
          ) : (
            <div className="hidden w-56 justify-between sm:flex">
              <SecondaryButton to="/login" title="Log In" type="link" />
              <SignUpButton to="/signup" />
            </div>
          )}
        </header>
      </div>
    </div>
  );
};
