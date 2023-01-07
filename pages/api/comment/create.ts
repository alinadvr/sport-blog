import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(addCommentRoute, sessionOptions);

async function addCommentRoute(req: NextApiRequest, res: NextApiResponse) {
  const { userId, postId, text } = req.body;
  try {
    const { data } = await axios.post("http://localhost:3001/comments", {
      id: null,
      user_id: userId,
      post_id: postId,
      text,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
