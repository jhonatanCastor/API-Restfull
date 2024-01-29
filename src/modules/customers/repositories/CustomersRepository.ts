import prisma from "@/utils/PrismaClient";
import { Customers } from "@prisma/client";

interface IRequest {
  uid?: string;
  email: string;
  name: string;
}

export class CustomersRepository {

  public async create(data: IRequest): Promise<Customers> {
    const customers = await prisma.customers.create({
      data: {
        name: data.name,
        email: data.email,
      }
    });
    return customers;
  }

  public async find() {
    const customers = await prisma.customers.findMany();
    return customers;
  }

  public async findByEmail(email: string) {
    const customers = await prisma.customers.findFirst({
      where: {email}
    });
    return customers;
  }

  public async findByUid(uid: string) {
    const customers = await prisma.customers.findUnique({
      where: { uid },
    });
    return customers;
  }

  public async update(uid: string, data: IRequest): Promise<Customers | undefined> {
    const customers = await prisma.customers.update({
      where: { uid },
      data: {
        ...data,
      }
    });
    return customers;
  }

  public async delete(uid: string) {
    await prisma.customers.delete({
      where: { uid }
    });
  }

  public async save(data: IRequest): Promise<Customers | undefined> {
    const customers = await prisma.customers.update({
      where: {
        uid: data.uid
      },
      data: {
        name: data.name,
        email: data.email,
      }
    });
    return customers;
  }
}