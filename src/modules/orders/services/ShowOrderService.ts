import { Orders } from "@prisma/client";
import { OrdersRepository } from "@/modules/orders/repository/OrdersRepository";
import AppError from "@/shared/errors/AppError";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";

export class ShowOrderService {
  private domain = 'orders'
   public async execute(uid: string): Promise<Orders> {
    const orderRepository = new OrdersRepository();

    const order = await orderRepository.findByUid(uid);

    if (!order) throw new AppError('This order does not exist');

    return addLinksToEntityResponse(order, this.domain)
   }
}