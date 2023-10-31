import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "@prisma/client";

export class ShowProductService {
  public async execute(uid: string ): Promise<Product> {
    const productsRepository = new ProductRepository;

    const product = await productsRepository.findByUid(uid);

    if(!product) {
      throw new AppError("This user does not have any product");
    }

    return product;
  }
}