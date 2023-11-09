import { UserRepository } from "@modules/user/repositoryUser/UserRepository";
import { User } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSession {
  async execute({email, password} : IRequest): Promise<IResponse> {

    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Incorrect email or password", 401);
    }

     // O metodo compare do bcrypt vai comparar a senha enviada com a existente no banco
    const passwordConfirm = await compare(password, user.password)

    if(!passwordConfirm){
      throw new AppError("Incorrect email or password", 401);
    }

    //configurar CMD5 online: 'fdf0e3355ece044c5651c2cb09be4369'
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