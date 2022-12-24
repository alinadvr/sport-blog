import { NextPage } from "next";
import {
  CurrentUserDataType,
  DataType,
  getPostsData,
  PostComponentDataType,
  UsersDataType,
} from "../../lib/getReformattedData";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

import { Author } from "../../features/account";
import { Layout } from "../../components/layout/Layout";

interface AccountPageProps {
  user: UsersDataType;
  userPosts: PostComponentDataType[];
  currentUser: CurrentUserDataType;
  isLoggedIn: boolean;
}

const Account: NextPage<AccountPageProps> = ({
  user,
  userPosts,
  isLoggedIn,
  currentUser,
}) => {
  return (
    <Layout
      title={user.nickname}
      isLoggedIn={isLoggedIn}
      isBackToBlogButton={true}
      avatar={currentUser?.image}
    >
      <main>
        <Author userId={currentUser?.id} {...user} userPosts={userPosts} />
      </main>
    </Layout>
  );
};

export default Account;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const currentUser = context.req.session.user;

    const { params } = context;
    const response = await fetch("http://localhost:3001/db");
    const data: DataType = await response.json();
    const posts = getPostsData(data);

    const user = data.users.find(
      (user) => user.id === parseInt(params?.id as string)
    );

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    }

    const userPosts = posts.filter(
      (post) => post.author_id === parseInt(params?.id as string)
    );

    return {
      props: {
        user,
        userPosts,
        isLoggedIn: Boolean(currentUser),
        currentUser: currentUser || null,
      },
    };
  },
  sessionOptions
);
