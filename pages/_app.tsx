import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { theme } from "../lib/theme";
import "@ibm/plex";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Peerpoint</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <MantineProvider {...{ theme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
