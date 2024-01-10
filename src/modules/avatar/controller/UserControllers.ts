import { Request, Response } from "express";
import { UpdateUserAvatarService } from "@modules/avatar/service/UpdateUserAvatarService";

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (request.file) {
      const user = await updateAvatar.execute({
        user_uid: request.user.uid,
        avatarFileName: request.file.filename
      });

      return response.json(user);
    } else {
      return response.status(401).json({ error: 'No file provided' });
    }
  }

}