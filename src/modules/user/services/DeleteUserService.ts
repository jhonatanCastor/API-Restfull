import AppError from "@/shared/errors/AppError";
import { UserRepository } from "@/modules/user/repository/UserRepository";

interface IRequest {
  uid: string
}

export class DeleteUser {
  public async execute({ uid }: IRequest): Promise<void> {
    const userRepository = new UserRepository;

    const user = await userRepository.findByUid(uid)

    if (!user) {
      throw new AppError("This user does not exists");
    }
    await userRepository.delete(user.uid)
  }
}