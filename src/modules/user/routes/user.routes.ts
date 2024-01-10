import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "@modules/user/controllers/UserControllers";
import isAuthenticated from "@modules/session/middlewares/isAuthenticated";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', isAuthenticated, userController.index);

userRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      avatar: Joi.string()
    }
  }), userController.create);

userRouter.delete('/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().uuid()
    }
  }),
  userController.delete)

export default userRouter;