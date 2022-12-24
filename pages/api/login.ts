import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import {
  CurrentUserDataType,
  UsersDataType,
} from "../../lib/getReformattedData";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body);

  try {
    if (!email || !password) throw new Error("Missing e-mail or password");

    const users: UsersDataType[] = await fetch(
      "http://localhost:3001/users"
    ).then((response) => response.json());

    const user = users.find((user) => user.email === email);
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const currentUser: CurrentUserDataType = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
      description: user.description,
    };

    req.session.user = currentUser;
    await req.session.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}
