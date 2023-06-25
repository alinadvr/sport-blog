import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { transformDate } from "../../../utils/transformDate";
import { getFormData } from "../../../utils/getFormData";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(createPostRoute, sessionOptions);

async function createPostRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public/images/posts"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public/images/posts"));
  }
  const postData = await getFormData(req, "posts");
  console.log(postData)

  try {
    if (
      !postData.title ||
      !postData.categoryId ||
      !postData.text ||
      !postData.image
    )
      return res
        .status(400)
        .json({ message: "Missing title, text, category or image" });

    if (!postData.authorId)
      return res.status(400).json({ message: "Invalid author id" });

    await axios.post("http://localhost:3001/posts", {
      id: null,
      title: postData.title,
      date: transformDate(Date.now()),
      author_id: Number(postData.authorId),
      image: postData.image.newFilename,
      category_id: Number(postData.categoryId),
      likes_user_id: [],
      saved_user_id: [],
      text: postData.text,
    });

    res.status(200).json({ message: "Post has been successfully created" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
