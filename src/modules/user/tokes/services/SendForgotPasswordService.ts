import AppError from "@shared/errors/AppError";
import { UserRepository } from "../../repository/UserRepository";
import { UserTokes } from "../repository/UserTokensRepository";
import Logger from "@/utils/wisntonLogger";


export class SendForgotPasswordService {
  
  public async execute(email: string): Promise<void> {
    const usersRepository = new UserRepository();
    const userTokenRepository = new UserTokes();

    const user = await usersRepository.findByEmail(email);
    Logger.info(user);
    

    if (!user) {
      throw new AppError('User does not exists.', 404)
    }

    const token = await userTokenRepository.generate(user.uid as string);
    Logger.info(token)
  }
}