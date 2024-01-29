import { Customers } from "@prisma/client";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";

export class ShowCustomerService {
  private domain = 'customers'

  public async execute(uid: string): Promise<Customers> {
    const customersRepository = new CustomersRepository();

    const customers = await customersRepository.findByUid(uid);

    if(!customers) {
      throw new Error(`Customer not found!`);
    }
    return addLinksToEntityResponse(customers, this.domain);
  }
}