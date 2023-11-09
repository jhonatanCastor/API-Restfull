import { ObjectType, Field, } from "@nestjs/graphql";

@ObjectType()
export default class ProductEntitie {
  @Field(() => String, { description: 'ID of the Product', nullable: true })
  uid: string;

  @Field(() => String, { description: 'Name of the Product', nullable: true })
  name: string;

  @Field(() => Number, { description: 'Email of the Product', nullable: true })
  price: number;

  @Field(() => Number, { description: 'Email of the Product', nullable: true })
  quantity: number;

  @Field(() => String, { description: 'date of created Product', nullable: true })
  created_at: string;

  @Field(() => String, { description: 'date of the updated Product', nullable: true })
  updated_at: string;

}