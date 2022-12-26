import React from "react";
import Head from "next/head";
import {
  CategoriesDataType,
  PostComponentDataType,
} from "../../../lib/getReformattedData";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import {
  selectFilter,
  setActiveCategory,
  setFilterTitle,
} from "../../../redux/slices/filterSlice";

import { Header } from "../Header";
import { BackToBlogButton } from "../../buttons/BackToBlogButton";
import { Filter } from "../Filter";

interface LayoutProps {
  title: string;
  isLoggedIn: boolean;
  avatar?: string;
  isBackToBlogButton?: boolean;
  categories?: CategoriesDataType[];
  allPosts?: PostComponentDataType[];
  setPostsByParameter?: (posts: PostComponentDataType[]) => void;
  children?: JSX.Element | JSX.Element[];
}

export const Layout = ({
  title,
  isLoggedIn,
  avatar,
  children,
  isBackToBlogButton,
  categories,
  setPostsByParameter,
  allPosts,
}: LayoutProps) => {
  const dispatch = useAppDispatch();
  const categoryList = categories && [{ id: 0, title: "All" }, ...categories];

  const { activeCategory, filterTitle } = useSelector(selectFilter);

  React.useEffect(() => {
    return () => {
      dispatch(setActiveCategory(0));
      dispatch(setFilterTitle(""));
    };
  }, []);

  React.useEffect(() => {
    if (allPosts && setPostsByParameter) {
      let filteredPosts;
      if (activeCategory === 0) {
        filteredPosts = allPosts.filter((post) =>
          post.title.toLowerCase().includes(filterTitle.toLowerCase())
        );
      } else {
        filteredPosts = allPosts.filter(
          (post) =>
            post.category_id === activeCategory &&
            post.title.toLowerCase().includes(filterTitle.toLocaleLowerCase())
        );
      }
      setPostsByParameter(filteredPosts);
    }
  }, [activeCategory, filterTitle]);

  return (
    <div className="mb-5 grid gap-5">
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>

      <Header
        isLoggedIn={isLoggedIn}
        userAvatar={avatar}
        categories={categoryList}
      />

      <div className="grid gap-5">
        {categoryList && <Filter categories={categoryList} />}

        {isBackToBlogButton && <BackToBlogButton />}

        <main>{children}</main>
      </div>

      <footer />
    </div>
  );
};
