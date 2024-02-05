import AppError from "@/shared/errors/AppError";
import { ProductRepository } from "@/modules/products/repositories/ProductRepository";
import { Product } from "@prisma/client";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";
export class ShowProductService {
  private domain = 'products'
  public async execute(uid: string): Promise<Product> {
    const productsRepository = new ProductRepository();

    const product = await productsRepository.findByUid(uid);

    if (!product) {
      throw new AppError("This user does not have any product");
    };
    
    return addLinksToEntityResponse(product, this.domain);
  };
};