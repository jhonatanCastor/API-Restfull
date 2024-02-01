import AppError from "@/shared/errors/AppError";
import { OrdersRepository } from "@/modules/orders/repository/OrdersRepository";

export class DeleteOrderService {
  public async execute(uid: string): Promise<void> {
    const orderRepository = new OrdersRepository();

    const orderExist = await orderRepository.findByUid(uid);

    if(!orderExist)  throw new AppError("This order does not exist");
    await orderRepository.delete(orderExist.uid);
  }
}