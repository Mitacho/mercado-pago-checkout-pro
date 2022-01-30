import Head from "next/head";
import Link from "next/link";

import { usePreferenceMutation, useProductQuery } from "generated/graphql";
import { Button, Footer, Layout, ProductCheckout } from "@components";

import styles from "../styles/pages/Home.module.css";

import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data, loading, error } = useProductQuery({
    variables: {
      productId: "1234",
    },
  });

  const [getPreference, { data: preferenceData, loading: preferenceLoading }] =
    usePreferenceMutation();

  useEffect(() => {
    if (data?.product) {
      const { id, categoryId, description, pictureUrl, title, unitPrice } =
        data.product;
      getPreference({
        variables: {
          options: {
            items: [
              {
                id,
                categoryId,
                description,
                pictureUrl,
                title,
                unitPrice,
                quantity: 1,
              },
            ],
          },
        },
      });
    }
  }, [data, getPreference]);

  return (
    <div>
      <Head>
        <title>Mitacho - Mercado Pago Checkout Pro</title>
        <meta
          name="description"
          content="Integration of Mercado Pago Checkout Pro for Mercado Pago exam"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          {loading ? <h1>Loading…</h1> : null}
          {preferenceLoading ? <h1>Loading preference…</h1> : null}
          {error && error.message === "not authenticated" ? (
            <>
              <h1>You are logged out</h1>
              <Link href="/login">
                <a title="Fake login">
                  <Button
                    type="submit"
                    text="Login"
                    className="mt-200 highlight"
                  />
                </a>
              </Link>
              <p className="text-secondary-color mt-200">
                Don&apos;t worry… it is a fake login ;)
              </p>
            </>
          ) : null}
          {data && preferenceData?.preference.mp?.id ? (
            <ProductCheckout
              item={data.product}
              preferenceId={preferenceData.preference.mp?.id}
            />
          ) : null}
        </main>

        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
