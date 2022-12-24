import { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import {
  CategoriesDataType,
  CurrentUserDataType,
} from "../../lib/getReformattedData";

import { Layout } from "../../components/layout/Layout";
import { CreateEditPost } from "../../features/CreateEditPost";

interface CreatePageProps {
  user: CurrentUserDataType;
  categories: CategoriesDataType[];
}

const Create: NextPage<CreatePageProps> = ({ user, categories }) => {
  return (
    <Layout
      title="Create a post"
      avatar={user.image}
      isLoggedIn={true}
      isBackToBlogButton={true}
    >
      <CreateEditPost
        userId={user.id}
        categories={categories}
        apiRoute="create"
      />
    </Layout>
  );
};

export default Create;

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

    const data = await fetch("http://localhost:3001/categories");
    const categories: CategoriesDataType[] = await data.json();

    return {
      props: {
        user,
        categories,
      },
    };
  },
  sessionOptions
);
