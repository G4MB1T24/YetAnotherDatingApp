import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function CheckIfExists(email: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: { email: email },
  });
  if (user) {
    return true;
  }
  return false;
}

export default CheckIfExists