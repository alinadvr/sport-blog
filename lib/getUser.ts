import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./session";

export const isUserLogged = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    return {
      props: {},
    };
  },
  sessionOptions
);
