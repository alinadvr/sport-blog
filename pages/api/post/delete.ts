import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(deletePostRoute, sessionOptions);

async function deletePostRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id } = JSON.parse(req.body);

  try {
    await axios.delete(`http://localhost:3001/posts/${id}`);

    res.status(200).json({ message: "Post has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
