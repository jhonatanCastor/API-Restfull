import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import prisma from "@utils/PrismaClient";

interface IRequest {
  uid?: string ;
  name: string;
  price: number;
  quantity: number;
}

@Injectable()
export class ProductRepository {

  async findByProduct(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name: name
      }
    });
    return product
  }

  async createProduct(data: IRequest) {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity
      }
    })
    if (newProduct.name == '') {
      throw new AppError('Please by not')
    }
    return newProduct;
  }

  async save(product: Prisma.ProductUpdateInput): Promise<Product | undefined> {
    const updatedProduct = await prisma.product.update({
      where: {
        uid: (product.uid as string)
      },
      data: product,
    });

    if (!updatedProduct) {
      throw new AppError("Error or updated the product");
    }

    return updatedProduct;
  }

  async find() {
    const products = await prisma.product.findMany();
    return products
  }

  async findByUid(uid: string) {
    const product = await prisma.product.findUnique({
      where: {
        uid: uid
      }
    })
    return product
  }

  async delete(uid: string) {
    await prisma.product.delete({
      where: {
        uid: uid
      }
    })
  }

}