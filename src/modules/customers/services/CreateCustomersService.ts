import { Customers } from "@prisma/client";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository";
import { addLinksToEntityResponse } from "@/utils/hateoasUtils";
import AppError from "@/shared/errors/AppError";

interface IRequest {
  email: string;
  name: string;
}

export class CreateCustomersService {
  private domain = 'customers'

  public async execute(data: IRequest): Promise<Customers> {
    const customersRepository = new CustomersRepository();

    if(data.email === '') {
      throw new AppError('Email  is required');
    }

    if(data.name === '') {
      throw new AppError('Name is required');
    }

    const customers = await customersRepository.create(data);

    return addLinksToEntityResponse(customers, this.domain);
  }
}