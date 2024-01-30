import { Orders } from "@prisma/client";
import { OrdersRepository } from "@/modules/orders/repository/OrdersRepository";
import AppError from "@/shared/errors/AppError";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";

interface IProduct {
  uid: string;
  quantity: number;
}

interface IRquest {
  customer_uid: string;
  products: IProduct[];
}


export class UpdateOrderService {
  private domain = 'orders'
  public async execute(uid: string, data: IRquest): Promise<Orders> {
    const orderRepository = new OrdersRepository();

    const orderExist = await orderRepository.findByUid(uid);

    if (!orderExist) throw new AppError('This order does not exist');

    if (data.customer_uid === '' && null)  throw new AppError("Customer UID is required");

    const order = await orderRepository.update(uid, data);

    return addLinksToEntityResponse(order, this.domain);
  }
}