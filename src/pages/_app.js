import "@styles/globals.scss";
import { SnipcartProvider } from "use-snipcart/useSnipcart";
import SnipcartScript from "@lib/snipcart";

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <Component {...pageProps} />
      <SnipcartScript />
    </SnipcartProvider>
  );
}

export default MyApp;
