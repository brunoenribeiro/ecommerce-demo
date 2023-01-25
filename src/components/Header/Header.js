import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";
import { useSnipcart } from "use-snipcart/useSnipcart";
import OpenCardButton from "@components/OpenCardButton";
import Container from "@components/Container";

import styles from "./Header.module.scss";

const Header = () => {
  const { cart = {} } = useSnipcart();
  const { locale: activeLocale, locales, asPath } = useRouter();

  const otherLocales = useMemo(
    () => locales.filter((locale) => locale !== activeLocale),
    [locales, activeLocale]
  );

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Space Jelly</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/categories/apparel">
              <a>Apparel</a>
            </Link>
          </li>
          <li>
            <Link href="/categories/accessories">
              <a>Accessories</a>
            </Link>
          </li>
          <li>
            <Link href="/stores">
              <a>Find a Store</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <OpenCardButton>
            <FaShoppingCart />
            <span>${cart?.subtotal?.toFixed(2)}</span>
          </OpenCardButton>
        </p>
        <ul className={styles.headerLocales}>
          {otherLocales.map((otherLocale) => (
            <li key={otherLocale}>
              <Link href={asPath} locale={otherLocale}>
                <a>{otherLocale.toUpperCase()}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
};

export default Header;
