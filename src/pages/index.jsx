import Head from "next/head";
import Link from "next/link";
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

import Layout from "@components/Layout";
import Container from "@components/Container";
import AddProductToCartButton from "@components/AddProductToCartButton";

import styles from "@styles/Page.module.scss";

export default function Home({ home, products }) {
  const { heroTitle, heroText, heroLink, heroBackground } = home;

  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href={ heroLink }>
            <a>
              <div className={styles.heroContent}>
                <h2>{ heroTitle }</h2>
                <p>{ heroText }</p>
              </div>
              <img
                className={styles.heroImage}
                width={heroBackground.width}
                height={heroBackground.height}
                src={heroBackground.url}
                alt=""
              />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map((product) => {
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img
                        width={product.image.width}
                        height={product.image.height}
                        src={product.image.url}
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                  </a>
                </Link>
                <p>
                  <AddProductToCartButton
                    productId={product.id}
                    productName={product.name}
                    productPrice={product.price}
                    productUrl={`/products/${product.slug}`}
                    imageUrl={product.image.url}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const client = new ApolloClient({
    uri: "https://api-sa-east-1.hygraph.com/v2/clcy4n6d72s5y01t5gcbohop0/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query PAGE_HOME($locale: Locale!) {
        page(where: {slug: "home"}, locales: [$locale]) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
        }
        products(where: {categories_some: {slug: "featured"}}, locales: [$locale]) {
          id
          name
          price
          slug
          image
        }
      }
    `,
    variables: {
      locale: locale.replace('-', '_'),
    }
  });

  return {
    props: {
      home: data.page,
      products: data.products,
    },
  };
}
