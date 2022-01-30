import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Phone {
  @Field()
  areaCode: string;

  @Field()
  number: string;
}

@ObjectType()
class Identification {
  @Field()
  type: string;

  @Field()
  number: string;
}

@ObjectType()
class Address {
  @Field()
  streetName: string;

  @Field()
  streetNumber: number;

  @Field()
  zipCode: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field(() => Phone)
  phone: Phone;

  @Field(() => Identification)
  identification: Identification;

  @Field(() => Address)
  address: Address;
}
