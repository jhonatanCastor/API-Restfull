import Logger from "@/utils/wisntonLogger";
import { UserRepository } from "@/modules/user/repository/UserRepository";
import { UserTokes } from "@/modules/user/tokes/repository/UserTokensRepository";
import { hash } from "bcryptjs";
import { addHours, isAfter } from "date-fns";

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute( { token, password }: IRequest): Promise<void> {
    const userRepository = new UserRepository();
    const userTokenRepository = new UserTokes();
    
   const userToken = await userTokenRepository.findByToken(token);

   if(!userToken) {
    throw new Error("User token not exist");
   };

   const user = await userRepository.findByUid(userToken.user_uid);

   if(!user) {
    throw new Error("User not found!");
   };
   
   const tokenCreatedAt = userToken.created_at;
   const compareDate = addHours(tokenCreatedAt, 2);

   if(isAfter(Date.now(), compareDate)){
    throw new Error("Token expired!")
   };
   Logger.info(user.password);
   
   user.password = await hash(password, 8);

   Logger.info(user.password);

   await userRepository.save(user);
  }
}