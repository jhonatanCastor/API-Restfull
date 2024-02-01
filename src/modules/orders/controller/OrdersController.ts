import { CreateOrderService } from "@/modules/orders/services/CreateOrderService";
import { DeleteOrderService } from "@/modules/orders/services/DeleteOrderService";
import { ListOrdersService } from "@/modules/orders/services/ListOdersService";
import { ShowOrderService } from "@/modules/orders/services/ShowOrderService";

import { Request, Response } from "express";

export class OrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrders = new ListOrdersService();
    const orders = await listOrders.execute();
    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { uid } = request.params;
    const showOrders = new ShowOrderService();

    const order = await showOrders.execute(uid)
    return response.json(order)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_uid, products } = request.body;
    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_uid,
      products
    })
    return response.json(order)
  }


  public async delete(request: Request, response: Response): Promise<Response> {
    const { uid } = request.params;
    const deleteOrder = new DeleteOrderService();

    await deleteOrder.execute(uid)
    return response.json([])
  }


}