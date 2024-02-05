import { Customers } from "@prisma/client";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository";
import AppError from "@/shared/errors/AppError";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";

interface IRequest {
  uid?: string;
  email: string;
  name: string;
}

export class UpdateCustomersService {
  private domain = 'customers'

  public async execute(uid: string, data: IRequest): Promise<Customers | undefined> {
    
    const customersRepository = new CustomersRepository();

    const customersExist =  await customersRepository.findByUid(uid);

    if(!customersExist) {
      throw new AppError('Customer does not exist');
    }

    const customers = await customersRepository.update(uid, data);

    return addLinksToEntityResponse(customers,  this.domain);
  }
}