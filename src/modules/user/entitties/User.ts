import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export default class UserEntitie {
  @Field(() => String, {description: 'UID of the user', nullable: true})
  uid: string

  @Field(() => String, {description: 'Email of the user', nullable: true})
  email: string

  @Field(() => String, {description: 'Name of the user', nullable: true})
  name: string

  @Field(() => String, {description: 'Password of the user', nullable: true})
  password: string

  @Field(() => String, {description: 'Avatar of the user', nullable: true})
  avatar?: string

  @Field(() => String, { description: 'date of created Product', nullable: true })
  created_at: string;

  @Field(() => String, { description: 'date of the updated Product', nullable: true })
  updated_at: string;
}