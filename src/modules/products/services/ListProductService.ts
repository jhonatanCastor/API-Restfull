import { ProductRepository } from "@/modules/products/repositories/ProductRepository";
import { Product } from "@prisma/client";
import { addLinksToEntityList } from "@/utils/hateoasUtils";
export class ListProductService {
  private domain = 'products'
  public async execute(): Promise<Product[]> {
    const productsRepository = new ProductRepository;

    const products = await productsRepository.find();

    return addLinksToEntityList(products as Product[], this.domain);
  }
}