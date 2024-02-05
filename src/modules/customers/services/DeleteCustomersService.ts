import AppError from "@/shared/errors/AppError";
import { CustomersRepository } from "@/modules/customers/repositories/CustomersRepository";

export class DeleteCustomersService {
   public async execute(uid: string) {
    const customersRepository = new CustomersRepository();

    const customersExist = await  customersRepository.findByUid(uid);

    if(!customersExist){
      throw new AppError("Customer does not exist!");
    };
    
    await customersRepository.delete(uid);
   };
};