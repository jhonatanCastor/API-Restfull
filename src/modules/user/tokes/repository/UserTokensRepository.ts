import AppError from "@/shared/errors/AppError";
import prisma from "@/utils/PrismaClient";
import { Prisma, User_Tokens } from "@prisma/client";

interface IRequest {
  user_uid: string;
}

export class UserTokes {

  public async generate(data: IRequest): Promise<User_Tokens | undefined> {
    const useToken = await prisma.user_Tokens.create({
     data: {
      ...data,
     }
    });
    return useToken
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

  public async findByToken(token: string) {
    const userToken = await prisma.user_Tokens.findFirst({
      where: { token },
    });
    return userToken;
  }
}