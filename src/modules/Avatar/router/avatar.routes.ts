import multer from "multer";
import uploandsConfig from "@config/uploands";
import { Router } from "express";
import { UserAvatarController } from "../controller/UserControllers";
import isAuthenticated from "@modules/Session/middlewares/isAuthenticated";

const userAvatar = Router();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploandsConfig)

userAvatar.patch('/',
isAuthenticated,
upload.single('avatar'),
usersAvatarController.update,
)

export default userAvatar;