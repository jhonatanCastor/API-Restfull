import { Router } from "express";
import { CustomerController } from "@/modules/customers/controllers/CustomerController";
import isAuthenticated from "@/modules/session/middlewares/isAuthenticated";
import { Segments, celebrate } from "celebrate";
import Joi from "joi";

const customerRouter = Router();
const customerController = new CustomerController();
customerRouter.use(isAuthenticated);

customerRouter.get('/', customerController.index);

customerRouter.get('/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().uuid()
    },
  }),
  customerController.show);

customerRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required()
    },
  }),
  customerController.create);

customerRouter.put('/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().uuid()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required()
    },
  }),
  customerController.update);

customerRouter.delete('/:uid',
  celebrate({
    [Segments.PARAMS]: {
      uid: Joi.string().uuid()
    },
  }),
  customerController.delete);

  export default customerRouter;