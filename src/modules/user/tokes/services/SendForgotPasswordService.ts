import AppError from "@/shared/errors/AppError";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import { UserTokes } from "@/modules/user/tokes/repository/UserTokensRepository";
import EtherealMail from "@/config/mail/EthereImail";
import path from 'path'
export class SendForgotPasswordService {

  public async execute(email: string): Promise<void> {
    const usersRepository = new UserRepository();
    const userTokenRepository = new UserTokes();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    const token = await userTokenRepository.generate(user.uid as string);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Sales] Reset password',
      templateData: {  
        file:  forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  };
};