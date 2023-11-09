import AppError from "@shared/errors/AppError";
import { UserRepository } from "../repositoryUser/UserRepository";
import { hash } from "bcryptjs";

interface IRequest {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export class CreateUser {
  async execute({ name, email, password, avatar }: IRequest) {
    const userRepository = new UserRepository;
    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("E-mail already in use", 400);
    }
    
    // Criptografia de senha usando a biblioteca: "bcryptjs"
    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await userRepository.save(user);
    return user;
  }
}