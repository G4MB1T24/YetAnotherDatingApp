// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Hasher from "../../../helpers/SaltGen";
import CheckIfExists from "../../../helpers/CheckEmail";

type ResAttributes = {
  msg?: string;
  UserObj?: any
  success?: boolean;
};

const prisma = new PrismaClient();

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

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!emailRegex.test(email)) {
          return res.json({ msg: "Please enter a valid email" });
        }

        let emailCheck = await CheckIfExists(email);
        if (emailCheck == true) {
          return res.status(400).json({ msg: "Email already exists" });
        }

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
        res.send({ UserObj: user.id, success: true });
        break;

      default:
        return res.status(400).json({ msg: "Unsupported Request method" });
    }
  } catch (error: any) {
    res.send(error.message);
  }
}
