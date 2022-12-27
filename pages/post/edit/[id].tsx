import { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import {
  CategoriesDataType,
  CurrentUserDataType,
  getPostsData,
  PostComponentDataType,
} from "../../../lib/getReformattedData";
import { sessionOptions } from "../../../lib/session";

import { Layout } from "../../../components/layout/Layout";
import { CreateEditPost } from "../../../features/CreateEditPost";

interface EditPageProps {
  user: CurrentUserDataType;
  post: PostComponentDataType;
  categories: CategoriesDataType[];
}

const Edit: NextPage<EditPageProps> = ({ user, post, categories }) => {
  return (
    <Layout
      title="Edit post"
      isLoggedIn={true}
      isBackToBlogButton={true}
      avatar={user.image}
    >
      <CreateEditPost
        userId={user.id}
        categories={categories}
        apiRoute="edit"
        postId={post.id}
        postTitle={post.title}
        postCategoryId={post.category_id}
        postText={post.text}
        postImage={post.image}
      />
    </Layout>
  );
};

export default Edit;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const user = context.req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const { params } = context;

    const dataRes = await fetch(`http://localhost:3001/db`);
    const data = await dataRes.json();

    const posts = getPostsData(data);
    const post = posts.find(
      (post) => post.id === parseInt(params?.id as string)
    );

    if (!post) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    }

    if (post?.author_id !== user.id) {
      return {
        redirect: {
          permanent: false,
          destination: "/403",
        },
      };
    }

    return {
      props: {
        user,
        post,
        categories: data.categories,
      },
    };
  },
  sessionOptions
);
