import AppError from "@/shared/errors/AppError";
import prisma from "@/utils/PrismaClient";
import { Prisma, User_Tokens } from "@prisma/client";

interface IRequest {
  uid: string;
  token: string;
  expiresAt: Date | null;
  user_uid: string;
}
export class UserTokes {

  public async generate(user_uid: string): Promise<User_Tokens> {

    const userToken = prisma.user_Tokens.create({
      data: { user_uid },
    });

    return userToken;
  }

  async save(token: Prisma.User_TokensUpdateInput): Promise<User_Tokens | undefined> {
    const updatedUser = await prisma.user_Tokens.update({
      where: {
        uid: (token.uid as string)
      },
      data: token,
    })

    if (!updatedUser) {
      throw new AppError("Update failed")
    }

    return updatedUser;
  }

  async findByToken(token: string): Promise<User_Tokens | undefined> {

    const userToken = await prisma.user_Tokens.findUnique({
      where: {
        token,
      },
    });

    return userToken as User_Tokens;
  }
}