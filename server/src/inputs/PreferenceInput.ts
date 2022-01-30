import { Field, ID, InputType } from "type-graphql";

import { Product } from "@entities/Product";

@InputType()
export class ProductsInput implements Partial<Product> {
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

@InputType()
export class PreferenceInput {
  @Field(() => [ProductsInput])
  items: ProductsInput[];
}
