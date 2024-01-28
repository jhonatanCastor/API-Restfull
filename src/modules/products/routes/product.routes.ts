import { Router } from "express";
import { ProductController } from "@/modules/products/controllers/ProductsControllers";
import { celebrate, Joi, Segments } from "celebrate";

const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.index);

productRouter.get('/:uid', celebrate({
  [Segments.PARAMS]: {
    uid: Joi.string().uuid()
  },
}), productController.show);

productRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },
  }),
  productController.create);

productRouter.put('/:uid', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required()
  },
  [Segments.PARAMS]: {
    uid: Joi.string().uuid()
  },
}), productController.update);

productRouter.delete('/:uid', celebrate({
  [Segments.PARAMS]: {
    uid: Joi.string().uuid()
  },
}), productController.delete);

export default productRouter;