import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(deleteCommentRoute, sessionOptions);

async function deleteCommentRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    await axios.delete(`http://localhost:3001/comments/${id}`);

    res.status(200).json({ message: "Comment has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
