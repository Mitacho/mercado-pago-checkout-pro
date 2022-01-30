import dynamic from "next/dynamic";

const ProductCheckout = dynamic(
  () => {
    return import("@components/ProductCheckout");
  },
  { ssr: false }
);

export { default as Button } from "./Button";
export { default as Footer } from "./Footer";
export { default as InputField } from "./InputField";
export { default as Layout } from "./Layout";
export { default as Navbar } from "./Navbar";
export { default as Spinner } from "./Spinner";

export { ProductCheckout };
