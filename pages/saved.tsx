import { NextPage } from "next";
import { useState } from "react";
import {
  CategoriesDataType,
  CurrentUserDataType,
  DataType,
  getPostsData,
  PostComponentDataType,
} from "../lib/getReformattedData";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "../components/layout/Layout";
import { SmallPost } from "../features/posts/components/SmallPost";
import { EmptyCategory } from "../features/posts/components/EmptyCategory";

interface SavedPageProps {
  savedPosts: PostComponentDataType[];
  categories: CategoriesDataType[];
  user: CurrentUserDataType;
}

const Saved: NextPage<SavedPageProps> = ({ savedPosts, categories, user }) => {
  const [posts, setPosts] = useState<PostComponentDataType[]>(savedPosts);

  return (
    <Layout
      title="Saved posts"
      isLoggedIn={true}
      categories={categories}
      isBackToBlogButton={true}
      avatar={user.image}
      allPosts={savedPosts}
      setPostsByParameter={setPosts}
    >
      <div className="mx-auto w-5/6">
        {!posts.length ? (
          <EmptyCategory />
        ) : (
          <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 2xl:grid-cols-4">
            {posts.map((post) => (
              <SmallPost
                isUserPosts={false}
                key={post.id}
                id={post.id}
                saved={post.saved_user_id}
                image={post.image}
                likes={post.likes_user_id}
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

export default Saved;

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

    const savedPosts = allPosts.filter((post) =>
      post.saved_user_id.includes(user.id)
    );

    return {
      props: {
        user,
        savedPosts,
        categories: data.categories,
      },
    };
  },
  sessionOptions
);
