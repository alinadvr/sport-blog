import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default withIronSessionApiRoute(changePostRoute, sessionOptions);

async function changePostRoute(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  try {
    let changedPost;
    if (body.updatedLikes) {
      changedPost = { likes_user_id: body.updatedLikes };
    } else if (body.updatedSaved) {
      changedPost = { saved_user_id: body.updatedSaved };
    }
    await axios.patch(
      `http://localhost:3001/posts/${body.postId}`,
      changedPost
    );

    res.status(200).json({ message: `Post ${body.postId}` });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
