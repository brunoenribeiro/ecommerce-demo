import { useState } from "react";
import Head from "next/head";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Map from "@components/Map";

import styles from "@styles/Page.module.scss";
import avoidTooManyRequestsError from "@util/avoidTooManyRequestsError";

export default function Stores({ storeLocations }) {
  const [selectedLatlong, setSelectedLatlong] = useState(null);

  return (
    <Layout>
      <Head>
        <title>Space Jelly: Find a Store</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>Locations</h1>

        <div className={styles.stores}>
          <div className={styles.storesLocations}>
            <ul className={styles.locations}>
              {storeLocations.map((storeLocation) => (
                <li key={storeLocation.id}>
                  <p className={styles.locationName}>{storeLocation.name}</p>
                  <address>{storeLocation.address}</address>
                  <p>{storeLocation.phoneNumber}</p>
                  <p className={styles.locationDiscovery}>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedLatlong([
                          storeLocation.location.latitude,
                          storeLocation.location.longitude,
                        ])
                      }
                    >
                      View on Map
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir//${storeLocation.location.latitude},${storeLocation.location.longitude}/@${storeLocation.location.latitude},${storeLocation.location.longitude},16z`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions
                      <FaExternalLinkAlt />
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.storesMap}>
            <div className={styles.storesMapContainer}>
              <Map
                className={styles.map}
                zoomedLatlong={selectedLatlong}
                locations={storeLocations.map((storeLocation) => ({
                  latlong: [
                    storeLocation.location.latitude,
                    storeLocation.location.longitude,
                  ],
                  popupContent: (
                    <>
                      <strong>{storeLocation.name}</strong>
                      <p>{storeLocation.address}</p>
                    </>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  await avoidTooManyRequestsError();

  const client = new ApolloClient({
    uri: "https://api-sa-east-1.hygraph.com/v2/clcy4n6d72s5y01t5gcbohop0/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query STORE_LOCATIONS {
        storeLocations {
          id
          name
          address
          phoneNumber
          location {
            latitude
            longitude
          }
        }
      }
    `,
  });

  return {
    props: {
      storeLocations: data.storeLocations,
    },
  };
}
