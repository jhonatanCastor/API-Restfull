import userAvatar from "@/modules/avatar/router/avatar.routes";
import sessionRouter from "@/modules/session/routers/session.routes";
import productRouter from "@/modules/products/routes/product.routes";
import userRouter from "@/modules/user/routes/user.routes";
import { Router } from "express";
import passwordRouter from "@/modules/user/tokes/routes/password.routes";
import profileRouter from "@/modules/user/routes/profile.routes";

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/avatar', userAvatar)
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;