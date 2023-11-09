import { Request, Response } from "express";
import { CreateSession } from "../CreateSession";


export default class SessionController {
  public async createSession(request: Request, response: Response): Promise<Response> {
    const {email, password} = request.body;

    const createSession = new CreateSession();
    const create = await createSession.execute({
      email,
      password
    });

    return response.json(create)
  }
}