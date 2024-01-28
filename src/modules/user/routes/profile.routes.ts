import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "@/modules/session/middlewares/isAuthenticated";
import { ProfileController } from "@/modules/user/controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmations: Joi.string()
         .valid(Joi.ref('password'))
         .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
         })
    }
  }), profileController.update);

export default profileRouter;