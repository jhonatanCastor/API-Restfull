import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import prisma from "@utils/PrismaClient";

interface IRequest {
  uid?: string;
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

@Injectable()
export class UserRepository {

  async create(data: IRequest) {
    const createUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
      }
    })

    if (createUser.name == '') {
      throw new AppError('Please by not')
    }
    return createUser;
  }

  async findByEmail(email: string) {
    const userName = await prisma.user.findFirst({
      where: { email: email },
    });
    return userName;
  }

  async find() {
    const users = await prisma.user.findMany();
    return users;
  }

  async findByUid(uid: string) {
    const user = await prisma.user.findUnique({
      where: { 
        uid: uid
       },
    })
    return user;
  }

  async save(user: Prisma.UserUpdateInput): Promise<User | undefined> {
    const updatedUser = await prisma.user.update({
      where: { 
        uid: (user.uid as string )
      }, 
      data: user,
    })

    if(!updatedUser) {
      throw new AppError("Update failed")
    }
    
    return updatedUser;
  }

  async delete(uid: string) {
      await prisma.user.delete({
       where: {
          uid: uid
        }
      })
  }
}