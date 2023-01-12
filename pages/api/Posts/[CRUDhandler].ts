import jwtAuth from "../../../helpers/Auth/jwtAuth";
import { prisma } from "../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: any = req.query.CRUDhandler;
  const userJWT: any = await jwtAuth(req, res);

  if (!userJWT) {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }
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
    case "PUT":
      const { title, content } = req.body;
      if (!title || !content)
        return res
          .status(404)
          .json({ msg: "please fill all the required fields", success: false });
      try {
        // check if post exists with the provided id
        const postExists = await prisma.post.findFirst({ where: { id: id } });
        if (!postExists) {
          return res
            .status(404)
            .json({ msg: "Post not found", success: false });
        }
        // Update the post if exists
        const post = await prisma.post
          .update({
            where: {
              id: id,
            },
            data: {
              title: title,
              content: content,
            },
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ msg: "Some error happened" });
          });
        return res.status(200).json({ msg: "Success!", success: true });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ msg: "Some error happened" });
      }

    default:
      return res.status(400).json({ msg: "Unsupported Request method" });
  }
}
