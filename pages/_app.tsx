import {
  createEmotionCache,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";

import "inter-ui";

const peerpointTheme: MantineThemeOverride = {
  primaryColor: "orange",
  fontFamily:
    "Inter var,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  headings: { fontFamily: "inherit" },
};

const cache = createEmotionCache({ key: "pp" });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Peerpoint</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        theme={peerpointTheme}
        emotionCache={cache}
        withGlobalStyles
        withNormalizeCSS
      >
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
