import { Prisma, Product } from "@prisma/client";
import AppError from "@/shared/errors/AppError";
import prisma from "@/utils/PrismaClient";
interface IRequest {
  uid?: string;
  name: string;
  price: number;
  quantity: number;
};
interface IFindProducts {
  uid: string;
};
export class ProductRepository {

  async findByProduct(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name: name
      }
    });
    return product;
  };

  async createProduct(data: IRequest) {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      }
    })
    if (newProduct.name == '') {
      throw new AppError('Please by not')
    }
    return newProduct;
  };

  async save(products: Product[]): Promise<Product[]> {
    const updatedProducts: Product[] = [];
  
    for (const product of products) {
      const updatedProduct = await prisma.product.update({
        where: {
          uid: product.uid
        },
        data: product,
      });
  
      if (!updatedProduct) {
        throw new AppError(`Error updating product with UID ${product.uid}`);
      }
  
      updatedProducts.push(updatedProduct);
    }
    return updatedProducts;
  };

  async saveProduct(product: Prisma.ProductUpdateInput): Promise<Product | undefined> {
    const saveProduct = await prisma.product.update({
      where: { 
        uid: (product.uid as string )
      }, 
      data: product,
    });

    if(!saveProduct) {
      throw new AppError("save product failed")
    };
    return saveProduct;
  };

  async find() {
    const products = await prisma.product.findMany();
    return products;
  };

  async findByUid(uid: string) {
    const product = await prisma.product.findUnique({
      where: {
        uid: uid
      }
    })
    return product;
  };

  async findAllByUids(products: IFindProducts[]) {
    const validProductIds = products.filter(product => product.uid !== undefined).map(product => product.uid);

    if (validProductIds.length === 0) {
      return [];
    };

    const existsProducts = await prisma.product.findMany({
      where: {
        uid: {
          in: validProductIds
        }
      }
    });
    return existsProducts;
  };

  async delete(uid: string) {
    await prisma.product.delete({
      where: {
        uid: uid
      }
    });
  };
};