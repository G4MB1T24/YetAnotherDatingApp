import { prisma } from "../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwtAuth from "../../../helpers/Auth/jwtAuth";

export default async function GetUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const userJWT = await jwtAuth(req, res).catch((error) => {
        console.error(error);
        return false;
      });
      const user = await prisma.user.findFirst({
        where: {
          id: userJWT.id,
        },
        select: {
          id: true,
          age: true,
          name: true,
        },
      });
      if (!user)
        return res
          .status(404)
          .json({ msg: "User does'nt exist", success: false });

      return res.json({ user });

    default:
      return res.status(400).json({ msg: "Unsupported Request method" });
  }
}
