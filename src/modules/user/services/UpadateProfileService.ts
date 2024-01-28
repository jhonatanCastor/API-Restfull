import { User } from "@prisma/client";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";
import AppError from "@/shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_uid: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileUserService {
  private domain = 'user'
  public async execute({ 
    user_uid,
    name,
    email,
    password,
    old_password,
   }: IRequest): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.findByUid(user_uid);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await userRepository.findByEmail(email);

    if(userUpdateEmail && userUpdateEmail.uid !== user_uid) {
      throw new AppError("E-mail already in use");
    }

    if(password && !old_password) {
      throw new AppError("Old password is required");
    }

    if(password && old_password) {
      const checkPassword = await compare(old_password, user.password);

      if(!checkPassword) {
        throw new AppError("Incorrect old password")
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await userRepository.save(user)

    return addLinksToEntityResponse(user, this.domain);
  }
}

