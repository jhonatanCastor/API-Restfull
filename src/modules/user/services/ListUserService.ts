import { User } from "@prisma/client";
import { UserRepository } from "@modules/user/repository/UserRepository";
import { addLinksToEntityList, addLinksToEntityResponse } from "@utils/hateoasUtils";
import AppError from "@shared/errors/AppError";

export class ListUsers {
  private domain = 'user'
  public async execute(): Promise<User[]> {
    const userRepo = new UserRepository;

    const users = await userRepo.find();

    if (users && users.length > 0) {
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      const usersWithLinks = addLinksToEntityList(usersWithoutPassword, this.domain);

      return usersWithLinks;
    }

    throw new AppError('User not found')
  }

  async findUniqueUser(id: string) {
    const userRepository = new UserRepository();
    const users = await userRepository.findByUid(id);

    if (users) {
      const { password, ...userWithoutPassword } = users;

      return addLinksToEntityResponse(userWithoutPassword, this.domain);
    }

    throw new AppError('User not found');
  }
}