import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../repositories/ProductRepository";
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  async execute({ name, price, quantity }: IRequest) {
    const productsRepository = new ProductRepository;
    const productExist = await productsRepository.findByProduct(name)

    if (productExist) {
      throw new AppError('There is already one product with this name')
    }

    const product = await productsRepository.createProduct({
      name,
      price,
      quantity
    })
    await productsRepository.save(product)
    return product;
  }
}