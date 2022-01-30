import Head from "next/head";
import { useRouter } from "next/router";

import { Formik } from "formik";

import { Button, Footer, InputField } from "@components";

import { useLoginMutation } from "generated/graphql";

import { toErrorMap } from "utils/toErrorMap";

import styles from "../styles/pages/Login.module.css";

export default function Login(): JSX.Element {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Login - Mitacho - Mercado Pago Checkout Pro</title>
        <meta
          name="description"
          content="Integration of Mercado Pago Checkout Pro for Mercado Pago exam"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({ variables: values });

            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className="text-secondary-color mb-200 font-size-120 break-word">
                copy and paste the following email to login:{" "}
                <span className="c-blue">test_user_92801501@testuser.com</span>
              </h2>
              <InputField name="email" label="Email" />
              <Button
                type="submit"
                text="Login"
                style={{ marginTop: "1rem" }}
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </form>
          )}
        </Formik>
      </main>

      <Footer />
    </div>
  );
}
