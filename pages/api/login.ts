import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { UsersDataType } from "../../lib/getReformattedData";
import { sessionOptions } from "../../lib/session";
import axios from "axios";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Missing e-mail or password" });

    const { data: users } = await axios.get("http://localhost:3001/users");

    const user = users.find((user: UsersDataType) => user.email === email);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    req.session.user = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
      description: user.description,
    };

    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}
