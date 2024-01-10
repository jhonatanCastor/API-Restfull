import { CreateProductService } from "@modules/products/services/CreateProductService";
import { DeleteProductService } from "@modules/products/services/DeleteProductService";
import { ListProductService } from "@modules/products/services/ListProductService";
import { ShowProductService } from "@modules/products/services/ShowProductService";
import { UpdateProductService } from "@modules/products/services/UpdateProductService";
import { Request, Response } from "express";
export class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const product = await listProducts.execute();
    return response.json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {uid} = request.params;
    const showProduct = new ShowProductService();

    const product = await showProduct.execute(uid)
    return response.json(product)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    })
    return response.json(product)
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { name, price, quantity} = request.body;
    const {uid} = request.params;
    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      uid,
      name,
      price,
      quantity,
    })
    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {uid} = request.params;
    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({uid})
    return response.json([])
  }


}