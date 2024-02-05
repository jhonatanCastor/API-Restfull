import { Request, Response } from "express";
import { ListCustomersService } from "@/modules/customers/services/ListCustomersService";
import { ShowCustomerService } from "@/modules/customers/services/ShowCustomersService";
import { CreateCustomersService } from "@/modules/customers/services/CreateCustomersService";
import { UpdateCustomersService } from "@/modules/customers/services/UpdateCustomerService";
import { DeleteCustomersService } from "@/modules/customers/services/DeleteCustomersService";
export class CustomerController {

  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute();
    return response.json(customers);
  };

  public async show(request: Request, response: Response): Promise<Response> {
    const showCustomers = new ShowCustomerService();
    const { uid } = request.params;
    const customers = await showCustomers.execute(uid);
    return response.json(customers);
  };

  public async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = new CreateCustomersService();
    const  { name, email } = request.body;
    const customer = await createCustomer.execute({name, email});
    return response.status(201).json(customer);
   };

   public async update(request: Request, response: Response):Promise<Response> {
    const updateCustomer = new UpdateCustomersService();
    const {uid}  = request.params;
    const {name, email} = request.body;
    const customer = await updateCustomer.execute(uid, {name,email});
    return response.json(customer);
   };

   public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomer = new DeleteCustomersService();
    const  { uid } = request.params;
    await deleteCustomer.execute(uid);
    return response.sendStatus(204).json([]);
   };
};