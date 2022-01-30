import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  unitPrice: number;

  @Field()
  pictureUrl: string;

  @Field()
  quantity: number;

  @Field()
  categoryId: string;
}
