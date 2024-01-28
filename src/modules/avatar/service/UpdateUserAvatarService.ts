import AppError from "@/shared/errors/AppError";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import path from "path";
import uploadConfig from '@config/uploands'
import fs from "fs";
import { User } from "@prisma/client";

interface IRequest {
  user_uid: string;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  async execute({ user_uid, avatarFileName }: IRequest): Promise<User> {
    const userRepository = new UserRepository();

    const user = await userRepository.findByUid(user_uid);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    };

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.access(userAvatarFilePath).then(() => true).catch(() => false);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}