import { User } from "@entities";
import { users } from "@db";

import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  ObjectType,
  Field,
  Arg,
} from "type-graphql";
import { Context, FieldError } from "@types";
import { SESSION_KEY } from "@constants";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { request }: Context): User | null {
    if (!request.session.get(SESSION_KEY)) {
      return null;
    }

    return (
      users.find((user) => user.id === request.session.get(SESSION_KEY)) || null
    );
  }

  @Mutation(() => UserResponse)
  login(
    @Arg("email") email: string,
    @Ctx() { request }: Context
  ): UserResponse {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return {
        errors: [{ field: "email", message: "user doesn't exist" }],
      };
    }

    request.session.set(SESSION_KEY, user.id);

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { request }: Context): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        request.session.delete();
        resolve(true);
        return;
      } catch {
        resolve(false);
      }
    });
  }
}
