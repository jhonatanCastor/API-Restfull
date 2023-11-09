import { Request, Response } from "express";
import { ListUsers } from "../services/ListUserService";
import { CreateUser } from "../services/CreateUserSevice";
import { DeleteUser } from "../services/DeleteUserService";

export class UserController {
  public async index(reqest: Request, response: Response): Promise<Response>{
    const listUsers = new ListUsers();
    
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async create(reqest: Request, response: Response): Promise<Response>{
      const { name, email, password, avatar } = reqest.body;
      const createUser = new CreateUser();
      
      const user = await createUser.execute({
        name,
        email,
        password,
        avatar,
      });
      return response.json(user)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {uid} = request.params;
    const deleteUser = new DeleteUser();
    await deleteUser.execute({uid});
    return response.json([])
  }
}