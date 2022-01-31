import { useEffect } from "react";
// import Image from "next/image";
import Script from "next/script";

import { ProductQuery } from "generated/graphql";

// import { Button } from ".";

import { format } from "@utils/currency";

import styles from "@styles/components/ProductCheckout.module.css";

type Props = {
  item: ProductQuery["product"];
  preferenceId: string;
};

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const mpIsLoaded = typeof window.MercadoPago !== "undefined";

export default function ProductCheckout({
  item,
  preferenceId,
}: Props): JSX.Element {
  function loadMercadoPago() {
    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY, {
      locale: "pt-BR",
    });

    // Inicialize o checkout
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: ".cho-container",
        label: "Pague a compra",
      },
    });
  }

  const quantity = 1;

  useEffect(() => {
    if (mpIsLoaded) {
      loadMercadoPago();
    }
  }, []);

  if (!item) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
      {!mpIsLoaded ? (
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="lazyOnload"
          // @ts-ignore
          view="item"
          onLoad={() => {
            loadMercadoPago();
          }}
        />
      ) : null}
      <div className={styles.container}>
        <div>
          <picture>
            <img
              className={styles.picture}
              src={item.pictureUrl}
              alt={item.title}
            />
          </picture>
        </div>
        <div>
          <h2>{item.title}</h2>
        </div>
        <div className={styles.total}>
          <h3>{format(item.unitPrice)}</h3>
          <span>Quantity: {quantity}</span>
        </div>
        <div>
          <p>{item.description}</p>
        </div>
        <div className="mt-200">
          <div className={styles.total}>
            <h3>Total</h3>
            <span className={styles.price}>
              {format(item.unitPrice * quantity)}
            </span>
          </div>
          {/* <Button className="highlight mt-100 mw-200" text="Comprar" /> */}
          <div className="cho-container mt-100"></div>
        </div>
      </div>
    </>
  );
}
