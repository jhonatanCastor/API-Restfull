import AppError from "@/shared/errors/AppError";
import { ProductRepository } from "@/modules/products/repositories/ProductRepository";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";
import { Product } from "@prisma/client";
import RedisCache from "@/shared/cache/RedisCache";
interface IRequest {
  name: string;
  price: number;
  quantity: number;
};
export class CreateProductService {
  private domain = 'products'
  async execute({ name, price, quantity }: IRequest) {
    const productsRepository = new ProductRepository();
    const redisCache = new  RedisCache();

    const productExist = await productsRepository.findByProduct(name);

    if (productExist) {
      throw new AppError('There is already one product with this name')
    };

    const product = await productsRepository.createProduct({
      name,
      price,
      quantity
    });

    await redisCache.invalidate(`${process.env.PRODUCT_KEY}`);
    await productsRepository.saveProduct(product);
    
    return addLinksToEntityResponse(product as Product, this.domain);
  };
};