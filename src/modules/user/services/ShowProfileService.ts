import { User } from "@prisma/client";
import { UserRepository } from "@modules/user/repository/UserRepository";
import { addLinksToEntityResponse } from "@utils/hateoasUtils";
import AppError from "@shared/errors/AppError";

interface IRequest {
  uid: string
};

export class ShowProfileUserService {
  private domain = 'user'
  public async execute({ uid }: IRequest): Promise<User> {
    const userRepository = new UserRepository();

    const users = await userRepository.findByUid(uid);

    if (!users) {
      throw new AppError('User not found');
    };
    const { password, ...userWithoutPassword } = users;

    return addLinksToEntityResponse(userWithoutPassword, this.domain);
  };
};

