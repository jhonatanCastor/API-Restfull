import { ProductRepository } from "@/modules/products/repositories/ProductRepository";
import { Product } from "@prisma/client";
import { addLinksToEntityList } from "@/utils/hateoasUtils";
import redisCache from "@/shared/cache/RedisCache";
export class ListProductService {
  private domain = 'products'
  public async execute(): Promise<Product[]> {
    const productsRepository = new ProductRepository();

    let products = await redisCache.recover<Product[]>(
      `${process.env.PRODUCT_KEY}`
    );

    if(!products) {
      products = await productsRepository.find();

      await redisCache.save(`${process.env.PRODUCT_KEY}`,  products);
    };

    return addLinksToEntityList(products, this.domain);
  };
};