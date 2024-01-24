import { Request, Response } from "express";
import { ShowProductService } from "@/modules/products/services/ShowProductService";
import { UpdateProductService } from "@/modules/products/services/UpdateProductService";
import { UpdateProfileUserService } from "../services/UpadateProfileService";

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.uid;
    const showUser = new ShowProductService();

    const user = await showUser.execute(user_id);
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