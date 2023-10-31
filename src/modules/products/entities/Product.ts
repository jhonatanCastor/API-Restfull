import { ObjectType, Field, } from "@nestjs/graphql";

@ObjectType()
export default class ProductEntitie {
  @Field(() => String, { description: 'ID of the user', nullable: true })
  uid: string;

  @Field(() => String, { description: 'Name of the user', nullable: true })
  name: string;

  @Field(() => Number, { description: 'Email of the user', nullable: true })
  price: number;

  @Field(() => Number, { description: 'Email of the user', nullable: true })
  quantity: number;

  @Field(() => String, { description: 'date of created user', nullable: true })
  created_at: string;

  @Field(() => String, { description: 'date of the updated user', nullable: true })
  updated_at: string;

}