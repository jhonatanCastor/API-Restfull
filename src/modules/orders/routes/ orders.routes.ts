import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { OrderController } from "@/modules/orders/controller/OrdersController";
import isAuthenticated from "@/modules/session/middlewares/isAuthenticated";

const ordersRouter = Router();
const orderController = new OrderController();
ordersRouter.use(isAuthenticated);

ordersRouter.get('/', orderController.index);

ordersRouter.get('/:uid', celebrate({
  [Segments.PARAMS]: {
    uid: Joi.string().uuid()
  },
}), orderController.show);

ordersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      customer_uid: Joi.string().uuid(),
      products: Joi.required()
    },
  }),
  orderController.create);

ordersRouter.delete('/:uid', celebrate({
  [Segments.PARAMS]: {
    uid: Joi.string().uuid()
  },
}), orderController.delete);

export default ordersRouter;