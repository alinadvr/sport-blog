import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import {
  CommentsComponentDataType,
  CurrentUserDataType,
  DataType,
  getCommentsData,
  getPostsData,
  PostComponentDataType,
} from "../../lib/getReformattedData";

import { Layout } from "../../components/layout/Layout";
import { OnePost } from "../../features/posts/components/OnePost/OnePost";

interface PostPageProps {
  post: PostComponentDataType;
  comments: CommentsComponentDataType[];
  isLoggedIn: boolean;
  user: CurrentUserDataType;
}

const Post: NextPage<PostPageProps> = ({
  post,
  comments,
  isLoggedIn = false,
  user,
}) => {
  return (
    <Layout
      title={post.title}
      avatar={user?.image}
      isLoggedIn={isLoggedIn}
      isBackToBlogButton={true}
    >
      <div className="mx-auto grid w-11/12 gap-5 sm:w-5/6 lg:w-2/3 xl:w-1/2">
        <OnePost
          key={post.id}
          {...post}
          authorId={post.author_id}
          likes={post.likes_user_id}
          saved={post.saved_user_id}
          comments={comments}
          userId={user?.id}
        />
      </div>
    </Layout>
  );
};

export default Post;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const user = context.req.session.user;

    const { params } = context;
    const response = await fetch("http://localhost:3001/db");
    const data: DataType = await response.json();

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

    let comments = getCommentsData(data);
    comments = comments.filter((comment) => comment.post_id === post?.id);

    return {
      props: {
        isLoggedIn: Boolean(user),
        user: user || null,
        post,
        comments,
      },
    };
  },
  sessionOptions
);
