import { prisma } from "../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import isValidEmail from "../../../helpers/EmailHelpers/EmailReg";
import { compare } from "bcryptjs";
import TokenGen from "../../../helpers/Auth/TokenGen";

type ResAttributes = {
  msg?: string;
  UserObj?: string;
  success?: boolean;
  Token?: string;
};

export default async function Login(
  req: NextApiRequest,
  res: NextApiResponse<ResAttributes>
) {
  try {
    switch (req.method) {
      case "POST":
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.json({ msg: "Please fill all the fields" });
        }

        if (!isValidEmail(email))
          return res.status(404).json({ msg: "Invalid Email", success: false });

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user)
          return res
            .status(404)
            .json({ msg: "User does'nt exist", success: false });

        let PasswordCompare: boolean = await compare(password, user.password);
        if (!PasswordCompare)
          return res
            .status(404)
            .json({ msg: "Invalid Password", success: false });

        res
          .status(200)
          .json({ success: true, Token: TokenGen(user.id, user.email) });
        break;

      default:
        return res.status(400).json({ msg: "Unsupported Request method" });
        break;
    }
  } catch (error) {}
}
