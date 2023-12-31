import userAvatar from "@modules/Avatar/router/avatar.routes";
import sessionRouter from "@modules/Session/routers/session.routes";
import productRouter from "@modules/products/routes/product.routes";
import userRouter from "@modules/user/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use('/products', productRouter);
routes.use('/user', userRouter);
routes.use('/session', sessionRouter);
routes.use('/avatar', userAvatar)

export default routes;