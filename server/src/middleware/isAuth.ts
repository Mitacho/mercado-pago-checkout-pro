import { SESSION_KEY } from "@constants";
import { Context } from "@types";

import type { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const session = context.request.session.get(SESSION_KEY);

  if (!session) {
    throw new Error("not authenticated");
  }

  return next();
};
