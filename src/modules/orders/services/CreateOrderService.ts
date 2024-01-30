import { Orders } from "@prisma/client";
import { OrdersRepository } from "@/modules/orders/repository/OrdersRepository";
import AppError from "@/shared/errors/AppError";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository";
import { ProductRepository } from "@/modules/products/repositories/ProductRepository";

interface IProduct {
  uid: string;
  quantity: number;
}

interface IRquest {
  customer_uid: string;
  products: IProduct[];
}

export class CreateOrderService {
  private domain = 'orders'
  public async execute({ customer_uid, products }: IRquest): Promise<Orders> {
    const orderRepository = new OrdersRepository();
    const customerRepository = new CustomersRepository();
    const productRepository = new ProductRepository();

    if (customer_uid === '' && undefined) throw new AppError('customer does not exist');

    const customerExists = await customerRepository.findByUid(customer_uid);

    if (!customerExists) throw new AppError('Customer does not exists');

    const productExists = await productRepository.findAllByUids(products);

    if (!productExists.length) {
      throw new AppError('Could not find any products with the given uid')
    }

    const existsProduct = productExists.map((product) => product.uid);

    const checkInexistentProducts = products.filter(
      product => !existsProduct.includes(product.uid)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find any products ${checkInexistentProducts[0].uid}.`)
    }

    const quantityAvailable = products.filter(
      product => productExists.filter(
        p => `${p.uid}` === `${product.uid}`
      )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].uid}.`)
    }

    const serializedProducts = products.map(product => ({
      product_id: product.uid,
      quantity: product.quantity,
      price: productExists.filter(p => p.uid === product.uid)[0].price
    }));

    const order = await orderRepository.create({
      customer: customerExists,
      products: serializedProducts,
    })

    return addLinksToEntityResponse(order, this.domain);
  }
}