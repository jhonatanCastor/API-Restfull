import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "@modules/session/middlewares/isAuthenticated";
import { ForgotPasswordController } from "@modules/user/tokes/controller/ForgotPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', 
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }), forgotPasswordController.create);

export default passwordRouter; 