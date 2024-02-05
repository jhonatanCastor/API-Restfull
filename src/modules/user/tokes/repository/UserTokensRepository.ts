import prisma from "@/utils/PrismaClient";
import { User_Tokens } from "@prisma/client";
export class UserTokes {
  public async generate(user_uid: string): Promise<User_Tokens> {
    const userToken = await prisma.user_Tokens.create({
      data: { user_uid },
    });
    return userToken;
  };

  async findByToken(token: string): Promise<User_Tokens | undefined> {
    const userToken = await prisma.user_Tokens.findUnique({
      where: {
        token,
      },
    });
    return userToken as User_Tokens;
  };
};