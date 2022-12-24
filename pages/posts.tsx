import { NextPage } from "next";
import {
  CategoriesDataType,
  CurrentUserDataType,
  DataType,
  getPostsData,
  PostComponentDataType,
} from "../lib/getReformattedData";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

import { Layout } from "../components/layout/Layout";
import { PrimaryButton } from "../components/buttons/PrimaryButton";
import { SmallPost } from "../features/posts/components/SmallPost";
import { EmptyCategory } from "../features/posts/components/EmptyCategory";

interface PostsPageProps {
  userPosts: PostComponentDataType[];
  categories: CategoriesDataType[];
  user: CurrentUserDataType;
}

const Posts: NextPage<PostsPageProps> = ({ userPosts, categories, user }) => {
  const [posts, setPosts] = useState<PostComponentDataType[]>(userPosts);

  return (
    <Layout
      title="My posts"
      isLoggedIn={true}
      categories={categories}
      isBackToBlogButton={true}
      avatar={user.image}
      allPosts={posts}
      setPostsByParameter={setPosts}
    >
      <div className="mx-auto mb-5 flex w-5/6 items-center justify-center sm:justify-between">
        <PrimaryButton type="link" title="+ Create" to="/post/create" />
      </div>

      <div className="mx-auto w-5/6">
        {!posts.length ? (
          <EmptyCategory />
        ) : (
          <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 2xl:grid-cols-4">
            {posts.map((post) => (
              <SmallPost
                isUserPosts={true}
                key={post.id}
                id={post.id}
                image={post.image}
                likes={post.likes_user_id}
                saved={post.saved_user_id}
                title={post.title}
                text={post.text}
                author={post.author}
                userId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Posts;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const dataRes = await fetch("http://localhost:3001/db");
    const data: DataType = await dataRes.json();
    const allPosts = getPostsData(data);

    const userPosts = allPosts.filter((post) => post.author_id === user.id);

    return {
      props: {
        user,
        userPosts,
        categories: data.categories,
      },
    };
  },
  sessionOptions
);
