import { User } from "@prisma/client";
import { UserRepository } from "../repositoryUser/UserRepository";

export class ListUsers {
  public async execute(): Promise<User[]> {
    const userRepo = new UserRepository;

    const users = await userRepo.find();

    return users;
  }
}