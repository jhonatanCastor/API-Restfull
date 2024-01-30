import prisma from "@/utils/PrismaClient";
import { Customers, Orders } from "@prisma/client";

interface IProduct {
  product_uid: string;
  price: number;
  quantity: number;
}

interface IRquest {
  customer: Customers;
  products: IProduct[];
}

export class OrdersRepository {

  public async find() {
    const orders = await prisma.orders.findMany();
    return orders;
  }

  public async findByUid(uid: string) {
    const order = await prisma.orders.findUnique({
      where: { uid }
    });
    return order
  }
// fix this function more late
  public async create({ customer, products }: IRquest): Promise<Orders> {
    const order = await prisma.orders.create({
      customer,
      orders: products,
    });
    return order;
  }

  public async update(uid: string, data: IRquest): Promise<Orders> {
    const order = await prisma.orders.update({
      where: {
        uid
      },
      data: {
        ...data
      }
    });
    return order;
  }

  public async save(uid: string, data: IRquest): Promise<Orders> {
    const order = await prisma.orders.update({
      where: {
        uid
      },
      data: {
        ...data
      }
    });
    return order
  }

  public async delete(uid: string): Promise<void> {
    await prisma.orders.delete({
      where: {
        uid
      }
    })
  }

}