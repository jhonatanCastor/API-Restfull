import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../repositories/ProductRepository";

interface IRequest{
  uid: string
}

export class DeleteProductService {
  public async execute({uid}: IRequest): Promise<void> {
    const productsRepository = new ProductRepository;

    const product = await productsRepository.findByUid(uid);

    if(!product) {
      throw new AppError("This user does not have any product");
    }

    await productsRepository.delete(product.uid)
  }
}