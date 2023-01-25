import "@styles/globals.scss";
import Script from "next/script";
import { SnipcartProvider } from "use-snipcart/useSnipcart";

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <Component {...pageProps} />
      <Script async defer src="/snipchart.js" />
    </SnipcartProvider>
  );
}

export default MyApp;
