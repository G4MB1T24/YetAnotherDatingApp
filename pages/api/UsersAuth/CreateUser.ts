import { prisma } from "../../../prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";
import Hasher from "../../../helpers/Auth/SaltGen";
import CheckIfExists from "../../../helpers/EmailHelpers/CheckEmail";
import TokenGen from "../../../helpers/Auth/TokenGen";
import isValidEmail from "../../../helpers/EmailHelpers/EmailReg";

type ResAttributes = {
  msg?: string;
  UserObj?: string;
  success?: boolean;
  Token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResAttributes>
) {
  try {
    switch (req.method) {
      case "POST":
        let { name, age, email, password } = req.body;
        if (!name || !age || !email || !password) {
          return res.json({ msg: "Please fill all the fields" });
        }

        if (!isValidEmail(email))
          return res.status(404).json({ msg: "Invalid Email", success: false });

        let emailCheck = await CheckIfExists(email);
        if (emailCheck)
          return res.status(400).json({ msg: "Email already exists" });

        if (age < 18) {
          return res.json({ msg: "Age requirement dissatisfied" });
        }

        const HashedPass = await Hasher(password);

        const user = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password: HashedPass,
          },
        });
        res.json({
          UserObj: user.id,
          success: true,
          Token: TokenGen(user.id, user.email),
        });
        break;

      default:
        return res.status(400).json({ msg: "Unsupported Request method" });
    }
  } catch (error: any) {
    res.send(error.message);
  }
}
