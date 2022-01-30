import mercadopago from "mercadopago";

import { products, users } from "@db";
import { Product } from "@entities";
import { PreferenceInput } from "@inputs/PreferenceInput";
import { FieldError, PreferencePayer, CreatePreferencePayload } from "@types";

import {
  Resolver,
  Query,
  Arg,
  Mutation,
  ObjectType,
  Field,
} from "type-graphql";
import { toSnakeCaseObject } from "@utils/strings";
import { MP_EXTERNAL_REFERENCE_EMAIL } from "@constants";

@ObjectType()
class MercadoPagoPreferenceResponse {
  @Field()
  id: string;

  @Field()
  init_point: string;
}

@ObjectType()
class PreferenceResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  success: boolean;

  @Field(() => MercadoPagoPreferenceResponse, { nullable: true })
  mp?: MercadoPagoPreferenceResponse;
}

@Resolver()
export class ProductResolver {
  @Query(() => Product, { nullable: true })
  // @UseMiddleware(isAuth)
  product(@Arg("id") id: string): Product | null {
    return products.find((product) => product.id === id) || null;
  }

  @Mutation(() => PreferenceResponse)
  // @UseMiddleware(isAuth)
  async preference(
    @Arg("options") options: PreferenceInput
  ): Promise<PreferenceResponse> {
    console.log(options.items);

    const items: Array<Product> = [];

    for (const item of options.items) {
      const itemFound = products.find((product) => product.id === item.id);

      if (!itemFound) {
        return {
          errors: [
            {
              field: "items",
              message: `the item with title " ${item.title} " was not found`,
            },
          ],
          success: false,
        };
      }

      if (itemFound && itemFound.quantity < item.quantity) {
        return {
          errors: [
            {
              field: "items",
              message: `the item with title " ${item.title} " does not have enough quantity in stock`,
            },
          ],
          success: false,
        };
      }

      itemFound.quantity = item.quantity;

      items.push(toSnakeCaseObject(itemFound));
    }

    const user = users.find((user) => user.id === "1");
    let payer: PreferencePayer | undefined = undefined;

    if (user) {
      const phoneSnakeCase = toSnakeCaseObject(
        user.phone
      ) as unknown as PreferencePayer["phone"];
      const addressSnakeCase = toSnakeCaseObject(
        user.address
      ) as unknown as PreferencePayer["address"];

      console.log(phoneSnakeCase);

      if (typeof phoneSnakeCase?.number === "string") {
        phoneSnakeCase!.number = Number(
          phoneSnakeCase?.number.replace(/\D/g, "")
        ) as unknown as string;
      }

      payer = user as unknown as PreferencePayer;
      payer.phone = phoneSnakeCase;
      payer.address = addressSnakeCase;
    }

    const preference: CreatePreferencePayload = {
      items: items,
      payer,
      external_reference: MP_EXTERNAL_REFERENCE_EMAIL,
      back_urls: {
        success: "https://www.success.com",
        failure: "http://www.failure.com",
        pending: "http://www.pending.com",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex",
          },
        ],
        installments: 6,
      },
      notification_url: "https://www.your-site.com/ipn",
    };

    console.log(payer);

    try {
      const response = await mercadopago.preferences.create(preference);
      // console.log(response);
      return {
        success: true,
        mp: {
          id: response.response.id,
          init_point: response.response.init_point,
        },
      };
    } catch (error) {
      return {
        errors: [
          {
            field: "mercadopago",
            message: String(error.message),
          },
        ],
        success: false,
      };
    }
  }
}
