import { ProductRepository } from "@modules/products/repositories/ProductRepository";
import { Product } from "@prisma/client";
export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = new ProductRepository;

    const products = await productsRepository.find();

    return products;
  }
}