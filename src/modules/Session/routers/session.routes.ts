import { Router } from "express";
import SessionController from "../controller/sessionController";
import { Joi, Segments, celebrate } from "celebrate";

const sessionRouter = Router();
const createController = new SessionController();

sessionRouter.post('/',
celebrate({
  [Segments.BODY]:{
    email:Joi.string().email().required(),
    password: Joi.string().required()
  }
}),
 createController.createSession)

 export default sessionRouter;