import Image from "next/image";
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

export default function ProductCheckout({
  item,
  preferenceId,
}: Props): JSX.Element {
  if (!item) {
    return <h1>Product not found</h1>;
  }

  function loadMercadoPago() {
    const mp = new window.MercadoPago(
      "TEST-156564c7-67ce-4bf4-b4c6-841a66743453",
      {
        locale: "pt-BR",
      }
    );

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

  return (
    <>
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="lazyOnload"
        onLoad={() => {
          loadMercadoPago();
        }}
      />
      <div className={styles.container}>
        <div>
          <picture>
            <Image
              className={styles.picture}
              height={720}
              width={720}
              src={item.pictureUrl}
              alt={item.title}
            />
          </picture>
        </div>
        <div>
          <h2>{item.title}</h2>
        </div>
        <div>
          <h3>{format(item.unitPrice)}</h3>
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
