import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ForgotPasswordController } from "@/modules/user/tokes/controller/ForgotPasswordController";
import ResetPasswordController from "@/modules/user/tokes/controller/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }), forgotPasswordController.create);

  passwordRouter.post('/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }), resetPasswordController.create);

export default passwordRouter; 