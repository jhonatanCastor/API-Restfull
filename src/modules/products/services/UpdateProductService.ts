import AppError from "@/shared/errors/AppError";
import { ProductRepository } from "@/modules/products/repositories/ProductRepository";
import { Product } from "@prisma/client";
import RedisCache from "@/shared/cache/RedisCache";
interface IRequest {
  uid: string;
  name: string;
  price: number;
  quantity: number;
};
export class UpdateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const values = { ...data }
    const productsRepository = new ProductRepository();
    const redisCache = new  RedisCache();

    const product = await productsRepository.findByUid(values.uid);

    if (!product) {
      throw new AppError("This user does not have any product");
    };

    const productExist = await productsRepository.findByProduct(values.name);
    if (productExist && productExist.name !== data.name) {
      throw new AppError('A product with this name already exists');
    };

    product.name = values.name;
    product.price = values.price;
    product.quantity = values.quantity;

    await redisCache.invalidate(`${process.env.PRODUCT_KEY}`);

    await productsRepository.saveProduct(product);

    return product;
  };
};