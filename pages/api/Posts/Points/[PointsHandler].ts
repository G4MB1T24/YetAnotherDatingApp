import { NextApiRequest, NextApiResponse } from "next";
import jwtAuth from "../../../../helpers/Auth/jwtAuth";
import { prisma } from "../../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.PointsHandler;
  const userJWT: any = await jwtAuth(req, res);

  if (!userJWT) {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }
  try {
    switch (req.method) {
      case "PUT":
        try {
          const post = await prisma.post.update({
            where: {
              id: id,
            },
            data: { Likes: { increment: +1 } },
          });
          return res.status(200).json({ msg: "Success!", success: true });
        } catch (error: any) {
          return res.status(500).json({ msg: "Some error happened" });
        }

      case "PATCH":
        try {
          const post = await prisma.post.update({
            where: {
              id: id,
            },
            data: { Likes: { increment: -1 } },
          });
          return res.status(200).json({ msg: "Success!", success: true });
        } catch (error: any) {
          return res.status(500).json({ msg: "Some error happened" });
        }
      default:
        return res.status(400).json({ msg: "Unsupported Request method" });

        break;
    }
  } catch (error) {
    return res.status(500).json({ msg: "Some error happened" });
  }
}
