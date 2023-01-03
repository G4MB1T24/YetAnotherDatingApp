// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type ResAttributes = {
  msg?: string;
  UserObj?: object;
  success?: boolean;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResAttributes>
) {
  try {
    const { name, age, email } = req.body;
    if (!name || !age || !email) {
      return res.json({ msg: "Please fill all the fields" });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return res.json({ msg: "Please enter a valid email" });
    }

    if (age < 18) {
      return res.json({ msg: "Age requirement dissatisfied" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        age,
        email,
      },
    });
    await res.send({ UserObj: user, success: true });
  } catch (error: any) {
    res.send(error.message);
  }
}
