import { UserRepository } from "@modules/user/repository/UserRepository";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import { addLinksToEntityResponse, removeSensitivyContentFromUser } from "@utils/hateoasUtils";
import { User } from "@prisma/client";

interface IRequest {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

export class CreateUser {
  private domain = 'user'
  async execute({ name, email, password, avatar }: IRequest) {
    const userRepository = new UserRepository;
    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("E-mail already in use", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await userRepository.save(user);
    return addLinksToEntityResponse(removeSensitivyContentFromUser(user as User), this.domain)
  }
}