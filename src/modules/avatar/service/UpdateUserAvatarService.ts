import AppError from "@/shared/errors/AppError";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import { User } from "@prisma/client";
import DiskStorageProvider from "@/shared/providers/StoregeProvider/DiskStoregeProvider";
import uploadConfig from '@/config/uploands';
import S3StorageProvider from "@/shared/providers/StoregeProvider/S3StorageProvider";

interface IRequest {
  user_uid: string;
  avatarFileName: string;
};

export class UpdateUserAvatarService {
  async execute({ user_uid, avatarFileName }: IRequest): Promise<User> {
    const userRepository = new UserRepository();
    const s3StorageProvider = new S3StorageProvider();
    const storageProvider = new DiskStorageProvider();

    const user = await userRepository.findByUid(user_uid);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    };

    if (uploadConfig.driver === 's3') {

      if (user.avatar) {
        await s3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await s3StorageProvider.saveFile(avatarFileName);

      user.avatar = fileName;

      await userRepository.save(user);

      return user;

    } else {

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      };

      const fileName = await storageProvider.saveFile(avatarFileName);

      user.avatar = fileName;

      await userRepository.save(user);

      return user;
    }
  };
};