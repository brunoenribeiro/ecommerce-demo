import Head from 'next/head';
import Link from 'next/link';
import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

import Layout from '@components/Layout';
import Container from '@components/Container';
import styles from '@styles/Page.module.scss'
import AddProductToCartButton from '@components/AddProductToCartButton';
import cloudinary from '@lib/cloudinary';
import avoidTooManyRequestsError from "@lib/avoidTooManyRequestsError";

export default function Category({ category, products }) {
  return (
    <Layout>
      <Head>
        <title>Space Jelly: Our {category.name}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>{category.name}</h1>

        <h2>Products</h2>

        <ul className={styles.products}>
          {products.map(product => {
            const imageWidth = 900;
            const imageHeight = 900;
            const imageUrl = cloudinary.image(product.image.public_id)
              .quality('auto')
              .format('auto')
              .resize(`w_${imageWidth},h_${imageHeight}`)
              .toURL();

            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img
                        width={imageWidth}
                        height={imageHeight}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>
                      {product.name}
                    </h3>
                    <p className={styles.productPrice}>
                      ${product.price?.toFixed(2)}
                    </p>
                  </a>
                </Link>
                <p>
                  <AddProductToCartButton
                    productId={product.id}
                    productName={product.name}
                    productPrice={product.price}
                    productSlug={`/products/${product.slug}`}
                    imageUrl={imageUrl}
                  />
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const client = new ApolloClient({
    uri: "https://api-sa-east-1.hygraph.com/v2/clcy4n6d72s5y01t5gcbohop0/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query CATEGORIES {
        categories {
          id
          slug
        }
      }
    `,
  });

  const paths = data.categories.flatMap(category => {
    return locales.map(locale => ({
      locale,
      params: {
        categorySlug: category.slug,
      },
    }))
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params, locale }) {
  await avoidTooManyRequestsError();
  
  const client = new ApolloClient({
    uri: "https://api-sa-east-1.hygraph.com/v2/clcy4n6d72s5y01t5gcbohop0/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query CATEGORY($categorySlug: String, $locale: Locale!) {
        category(where: { slug: $categorySlug }, locales: [$locale]) {
          id
          name
          slug
          products {
            id
            name
            slug
            price
            image
          }
        }
      }
    `,
    variables: {
      categorySlug: params.categorySlug,
      locale: locale.replace('-', '_'),
    }
  });

  return {
    props: {
      category: data.category,
      products: data.category.products,
    }
  }
}
