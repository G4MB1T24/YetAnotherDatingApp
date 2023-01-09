import { prisma } from "../../prisma/db";

async function CheckIfExists(email: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  if (user) {
    return true;
  }
  return false;
}

export default CheckIfExists;
