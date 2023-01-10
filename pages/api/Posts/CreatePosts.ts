import { prisma } from "../../../prisma/db";
import jwtAuth from "../../../helpers/Auth/jwtAuth";
import { NextApiRequest, NextApiResponse } from "next";

const CreatePosts = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      if (!req.body)
        return res
          .status(500)
          .json({ msg: "Body Cant be empty", success: false });

      const { title, content } = req.body;

      if (!title || !content)
        return res.json({ msg: "Please fill all the fields" });

      try {
        const userJWT: any = await jwtAuth(req, res);

        if (!userJWT) {
          return res.status(401).json({ msg: "Unauthorized", success: false });
        }

        const posts = await prisma.post.create({
          data: {
            title: title,
            content: content,
            userId: userJWT.id,
          },
        });
        return res.json({ posts, success: true });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ msg: "Some internal error occured!" });
      }

    default:
      return res.status(400).json({ msg: "Unsupported Request method" });
  }
};

export default CreatePosts;
