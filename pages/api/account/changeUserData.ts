import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import path from "path";
import fs from "fs/promises";
import { getFormData } from "../../../utils/getFormData";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSessionApiRoute(changeUserDataRoute, sessionOptions);

async function changeUserDataRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public/images/avatars"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public/images/avatars"));
  }

  const newUserData = await getFormData(req, "avatars");

  try {
    if (!newUserData.nickname)
      return res.status(400).json({ message: "Missing nickname" });

    if (newUserData.image) {
      await fs.unlink(`./public/images/avatars/${newUserData.oldImage}`);
    }

    const changedUser = {
      ...req.session.user,
      nickname: newUserData.nickname,
      description: newUserData.description,
      image: newUserData?.image?.newFilename || newUserData.oldImage,
    };

    await axios.patch(
      `http://localhost:3001/users/${req.session.user.id}`,
      changedUser
    );

    await req.session.destroy();
    req.session.user = changedUser;
    await req.session.save();
    res.status(200).json({ message: "Data has been successfully edited" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
