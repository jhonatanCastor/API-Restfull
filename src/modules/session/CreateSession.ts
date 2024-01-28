import { UserRepository } from "@/modules/user/repository/UserRepository";
import { User } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@/config/auth'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSession {
  async execute({ email, password }: IRequest): Promise<IResponse> {

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordConfirm = await compare(password, user.password)

    if (!passwordConfirm) {
      throw new AppError("Incorrect email or password", 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.uid,
      expiresIn: authConfig.jwt.expiryTime,
    })

    return {
      user,
      token
    };

  }
}