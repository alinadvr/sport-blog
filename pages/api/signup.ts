import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import axios from "axios";
import { UsersDataType } from "../../lib/getReformattedData";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(signupRoute, sessionOptions);

async function signupRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = JSON.parse(req.body);

  try {
    if (!email || !password) throw new Error("Missing e-mail or password");

    const users: UsersDataType[] = await fetch(
      "http://localhost:3001/users"
    ).then((response) => response.json());

    const isUserExist = users.filter((user) => user.email === email).length;
    if (isUserExist) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    await axios.post("http://localhost:3001/users", {
      id: null,
      nickname: "Anonymous",
      email,
      password: passwordHash,
      image: "",
      description: "I am a new user here!",
    });

    res.json({
      status: res.status,
      message: "User has been successfully registered",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
