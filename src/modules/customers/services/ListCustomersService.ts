import AppError from "@/shared/errors/AppError";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository"
import { addLinksToEntityList } from "@/utils/hateoasUtils";
import { Customers } from "@prisma/client";

export class ListCustomersService {
  private domain = 'customers'

  public async execute():  Promise<Customers[]> {
    const customersRepository = new CustomersRepository();

    const customers = await customersRepository.find();

    if(!customers) {
      throw new AppError('User not found');
    }

    return addLinksToEntityList(customers, this.domain); 
  }

}