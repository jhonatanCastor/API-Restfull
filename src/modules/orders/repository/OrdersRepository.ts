import prisma from "@/utils/PrismaClient";
import { Customers, Orders } from "@prisma/client";

interface IProduct {
  uid?: string;
  price: number;
  quantity: number;
}

interface IRequest {
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

  public async createOrder({ customer, products }: IRequest) {
    const order = await prisma.orders.create({
      data: {
        customer: {
          connect: { uid: customer.uid }
        },
        products: {
          create: products.map(product => ({
            product: {
              connect: { uid: product.uid }
            },
            price: product.price,
            quantity: product.quantity
          }))
        }
      }
    });

    return prisma.orders.findFirst({
      where: {
        uid: order.uid
      },
      include: {
        products: true
      }
    })
    // return order;
  }

  public async update(uid: string, data: IRequest): Promise<Orders> {
    const order = await prisma.orders.update({
      where: {
        uid
      },
      data: {
        customer: {
          connect: { uid: data.customer.uid }
        },
        products: {
          deleteMany: {},
          create: data.products.map(product => ({
            product: {
              connect: { uid: product.uid }
            },
            price: product.price,
            quantity: product.quantity
          }))
        }
      }
    });
    return order;
  }

  public async save(uid: string, data: IRequest): Promise<Orders> {
    const order = await prisma.orders.upsert({
      where: {
        uid
      },
      create: {
        uid,
        customer: {
          connect: { uid: data.customer.uid }
        },
        products: {
          create: data.products.map(product => ({
            product: {
              connect: { uid: product.uid }
            },
            price: product.price,
            quantity: product.quantity
          }))
        }
      },
      update: {
        customer: {
          connect: { uid: data.customer.uid }
        },
        products: {
          deleteMany: {},
          create: data.products.map(product => ({
            product: {
              connect: { uid: product.uid }
            },
            price: product.price,
            quantity: product.quantity
          }))
        }
      }
    });
    return order;
  }

  public async delete(uid: string): Promise<void> {
    await prisma.orders.delete({
      where: {
        uid
      }
    })
  }

}