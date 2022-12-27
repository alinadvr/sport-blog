import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { getFormData } from "../../../utils/getFormData";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(editPostRoute, sessionOptions);

async function editPostRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public/images/posts"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public/images/posts"));
  }
  const postData = await getFormData(req, "posts");

  try {
    if (
      !postData.title ||
      !postData.categoryId ||
      !postData.text ||
      !postData.oldImage ||
      !postData.image
    )
      return res
        .status(400)
        .json({ message: "Missing title, category, text or image" });

    if (postData.image) {
      await fs.unlink(`./public/images/posts/${postData.oldImage}`);
    }

    await axios.patch(`http://localhost:3001/posts/${Number(postData.id)}`, {
      title: postData.title,
      image: postData?.image?.newFilename || postData.oldImage,
      category_id: Number(postData.categoryId),
      text: postData.text,
    });

    res.status(200).json({ message: "Post has been successfully edited" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
