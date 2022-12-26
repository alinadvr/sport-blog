import React, { useState } from "react";
import { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import {
  CategoriesDataType,
  CurrentUserDataType,
  DataType,
  getPostsData,
  PostComponentDataType,
} from "../lib/getReformattedData";

import { Layout } from "../components/layout/Layout";
import { Post } from "../features/posts/components/Post";
import { EmptyCategory } from "../features/posts/components/EmptyCategory";

interface HomeProps {
  allPosts: PostComponentDataType[];
  categories: CategoriesDataType[];
  isLoggedIn: boolean;
  user: CurrentUserDataType;
}

const Home: NextPage<HomeProps> = ({
  allPosts,
  categories,
  isLoggedIn,
  user,
}) => {
  const [postsAmount, setPostsAmount] = useState<number>(2);
  const [posts, setPosts] = useState<PostComponentDataType[]>(allPosts);

  return (
    <Layout
      title="Sport Blog - Home Page"
      isLoggedIn={isLoggedIn}
      avatar={user?.image}
      categories={categories}
      allPosts={allPosts}
      setPostsByParameter={setPosts}
    >
      <div className="mx-auto grid w-5/6 gap-5 sm:w-1/2 2xl:w-1/3">
        {!posts.length ? (
          <EmptyCategory />
        ) : (
          posts
            .slice(0, postsAmount)
            .map((post) => (
              <Post
                key={post.id}
                {...post}
                authorId={post.author_id}
                likes={post.likes_user_id}
                saved={post.saved_user_id}
                userId={user?.id}
              />
            ))
        )}
        {posts.length > postsAmount && (
          <div className="mx-auto flex w-40 justify-center">
            <button
              onClick={() => setPostsAmount((prevState) => prevState + 2)}
              className="border-blue rounded-full border-2 bg-white px-10 py-2 text-xl"
            >
              More
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const dataRes = await fetch("http://localhost:3001/db");
    const data: DataType = await dataRes.json();
    const posts = getPostsData(data);

    return {
      props: {
        isLoggedIn: Boolean(user),
        user: user || null,
        allPosts: posts,
        categories: data.categories,
      },
    };
  },
  sessionOptions
);
