import { ObjectType, Field } from "type-graphql";

import type { FastifyRequest, FastifyReply } from "fastify";

export type {
  PreferencePayer,
  CreatePreferencePayload,
} from "mercadopago/models/preferences/create-payload.model";

export type Context = {
  request: FastifyRequest;
  reply: FastifyReply;
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
