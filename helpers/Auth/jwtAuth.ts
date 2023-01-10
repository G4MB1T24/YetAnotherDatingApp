import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
const jwt_sec: any = process.env.JWT_SECRET;
// const jwtAuth = async (req: NextApiRequest, res: NextApiResponse) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.json({ msg: "Denied", success: false });
//   }
//   try {
//     const userJWT = jwt.verify(token, jwt_sec);
//     return userJWT;
//   } catch (error: any) {
//     console.log(error.message);
//     if (
//       error.message === "jwt malformed" ||
//       error.message === "invalid token"
//     ) {
//       res.status(404).json({ msg: "Invalid Email", success: false });
//       console.log("nowt working");
//       return false;
//     }
//     return error.message;
//   }
// };

// export default jwtAuth;
const jwtAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization;
  if (!token) {
    return false;
  }
  try {
    const userJWT = jwt.verify(token, jwt_sec);
    return userJWT;
  } catch (error:any) {
    console.log(error.message);
    return false;
  }
};

export default jwtAuth