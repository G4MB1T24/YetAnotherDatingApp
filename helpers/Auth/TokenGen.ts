import jwt from "jsonwebtoken";
import { env } from "process";


let jwt_sec: any = process.env.JWT_SECRET;

const TokenGen = (id: string, email: string) => {
  return jwt.sign({ id, email }, jwt_sec, {
    expiresIn: "30d",
  });
};
export default TokenGen;
