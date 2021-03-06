// import Image from "next/image";

import styles from "../styles/components/Footer.module.css";

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <span>Mercado Pago &lt;Dev&gt;Program January 2021</span>
      <a
        href="https://github.com/Mitacho/mercado-pago-checkout-pro"
        target="_blank"
        rel="noopener noreferrer"
        title="Application GitHub Repository"
        aria-label="Link to the this application GitHub Repository"
      >
        GitHub{" "}
        <span className={styles.logo}>
          <img
            src="/github-light.png"
            alt="Vercel Logo"
            width={32}
            height={32}
          />
        </span>
      </a>
    </footer>
  );
}
