import { Request, Response } from "express";
import { ListUsers } from "@modules/user/services/ListUserService";
import { CreateUser } from "@modules/user/services/CreateUserService";
import { DeleteUser } from "@modules/user/services/DeleteUserService";

export class UserController {
  public async index(request: Request, response: Response): Promise<Response>{
    const listUsers = new ListUsers();
    
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response>{
      const { name, email, password, avatar } = request.body;
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