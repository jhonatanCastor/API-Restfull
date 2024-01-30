import { Orders } from "@prisma/client";
import { OrdersRepository } from "@/modules/orders/repository/OrdersRepository";
import AppError from "@/shared/errors/AppError";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";

export class ListOrdersService {
  private domain = 'orders'
   public async execute(): Promise<Orders[]> {
    const ordersRepository = new OrdersRepository();

    const orders = await ordersRepository.find();

    if(!orders.length)  throw new AppError("No orders found");

    return addLinksToEntityResponse(orders, this.domain);
   }
}