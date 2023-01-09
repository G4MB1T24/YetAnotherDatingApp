import { prisma } from "../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.DeletePost;
  switch (req.method) {
    case "DELETE":
      try {
        const post = await prisma.post
          .delete({ where: { id: id } })
          .catch((error) => {
            return res.json({ msg: "Post not found", success: false });
          });

        return res.status(404).json({ msg: "Success!", success: true });
      } catch (error: any) {
        // console.log(error.message);
      }
      break;

    default:
      return res.status(400).json({ msg: "Unsupported Request method" });
  }
}
