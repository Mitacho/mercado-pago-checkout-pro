import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: "Address";
  streetName: Scalars["String"];
  streetNumber: Scalars["Float"];
  zipCode: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Identification = {
  __typename?: "Identification";
  number: Scalars["String"];
  type: Scalars["String"];
};

export type MercadoPagoPreferenceResponse = {
  __typename?: "MercadoPagoPreferenceResponse";
  id: Scalars["String"];
  init_point: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: UserResponse;
  logout: Scalars["Boolean"];
  preference: PreferenceResponse;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
};

export type MutationPreferenceArgs = {
  options: PreferenceInput;
};

export type Phone = {
  __typename?: "Phone";
  areaCode: Scalars["String"];
  number: Scalars["String"];
};

export type PreferenceInput = {
  items: Array<ProductsInput>;
};

export type PreferenceResponse = {
  __typename?: "PreferenceResponse";
  errors?: Maybe<Array<FieldError>>;
  mp?: Maybe<MercadoPagoPreferenceResponse>;
  success: Scalars["Boolean"];
};

export type Product = {
  __typename?: "Product";
  categoryId: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  pictureUrl: Scalars["String"];
  quantity: Scalars["Float"];
  title: Scalars["String"];
  unitPrice: Scalars["Float"];
};

export type ProductsInput = {
  categoryId: Scalars["String"];
  description: Scalars["String"];
  id: Scalars["ID"];
  pictureUrl: Scalars["String"];
  quantity: Scalars["Float"];
  title: Scalars["String"];
  unitPrice: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  product?: Maybe<Product>;
};

export type QueryProductArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  address: Address;
  email: Scalars["String"];
  id: Scalars["ID"];
  identification: Identification;
  name: Scalars["String"];
  phone: Phone;
  surname: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  name: string;
  surname: string;
  email: string;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "UserResponse";
    errors?:
      | Array<{ __typename?: "FieldError"; field: string; message: string }>
      | null
      | undefined;
    user?:
      | {
          __typename?: "User";
          id: string;
          name: string;
          surname: string;
          email: string;
        }
      | null
      | undefined;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type PreferenceMutationVariables = Exact<{
  options: PreferenceInput;
}>;

export type PreferenceMutation = {
  __typename?: "Mutation";
  preference: {
    __typename?: "PreferenceResponse";
    success: boolean;
    errors?:
      | Array<{ __typename?: "FieldError"; field: string; message: string }>
      | null
      | undefined;
    mp?:
      | {
          __typename?: "MercadoPagoPreferenceResponse";
          id: string;
          init_point: string;
        }
      | null
      | undefined;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename?: "User";
        id: string;
        name: string;
        surname: string;
        email: string;
      }
    | null
    | undefined;
};

export type ProductQueryVariables = Exact<{
  productId: Scalars["String"];
}>;

export type ProductQuery = {
  __typename?: "Query";
  product?:
    | {
        __typename?: "Product";
        id: string;
        title: string;
        description: string;
        pictureUrl: string;
        unitPrice: number;
        quantity: number;
        categoryId: string;
      }
    | null
    | undefined;
};

export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    name
    surname
    email
  }
`;
export const LoginDocument = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      errors {
        field
        message
      }
      user {
        id
        name
        surname
        email
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const PreferenceDocument = gql`
  mutation Preference($options: PreferenceInput!) {
    preference(options: $options) {
      errors {
        field
        message
      }
      success
      mp {
        id
        init_point
      }
    }
  }
`;
export type PreferenceMutationFn = Apollo.MutationFunction<
  PreferenceMutation,
  PreferenceMutationVariables
>;

/**
 * __usePreferenceMutation__
 *
 * To run a mutation, you first call `usePreferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePreferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [preferenceMutation, { data, loading, error }] = usePreferenceMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function usePreferenceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PreferenceMutation,
    PreferenceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PreferenceMutation, PreferenceMutationVariables>(
    PreferenceDocument,
    options
  );
}
export type PreferenceMutationHookResult = ReturnType<
  typeof usePreferenceMutation
>;
export type PreferenceMutationResult =
  Apollo.MutationResult<PreferenceMutation>;
export type PreferenceMutationOptions = Apollo.BaseMutationOptions<
  PreferenceMutation,
  PreferenceMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductDocument = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      title
      description
      pictureUrl
      unitPrice
      quantity
      categoryId
    }
  }
`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductQuery(
  baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options
  );
}
export function useProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(
    ProductDocument,
    options
  );
}
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<
  ProductQuery,
  ProductQueryVariables
>;
