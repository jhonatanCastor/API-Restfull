import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Vendas {
  @Field(() => Int, { description: 'ID of the user', nullable: true })
  uid: number;

  @Field(() => String, { description: 'Name of the user', nullable: true })
  name: string;

  @Field(() => Number, { description: 'vale of the b', nullable: true })
  value: number;

  @Field(() => String, { description: 'date of created user', nullable: true })
  created_at: string;

  @Field(() => String, { description: 'date of the updated user', nullable: true })
  updated_at: string;
}