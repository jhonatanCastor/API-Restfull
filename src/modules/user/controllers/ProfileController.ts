import { Request, Response } from "express";
import { UpdateProfileUserService } from "@/modules/user/services/UpadateProfileService";
import { ShowProfileUserService } from "@/modules/user/services/ShowProfileService";

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const uid = request.user.uid;
    const showUser = new ShowProfileUserService();

    const user = await showUser.execute({ uid });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const user_uid = request.user.uid;
    const { name, email, password, old_password } = request.body;

    const updateUser = new UpdateProfileUserService();

    const user = await updateUser.execute({
      user_uid,
      name,
      email,
      password,
      old_password
    });
    return response.json(user)
  }
}