import "@ibm/plex";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
// import { useColorScheme } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { theme } from "../lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  // const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useState<ColorScheme>();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  function handleExitComplete() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Peerpoint</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <ColorSchemeProvider {...{ colorScheme, toggleColorScheme }}>
        <MantineProvider
          {...{ theme: { colorScheme, ...theme } }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <SessionProvider session={pageProps.session}>
              <AnimatePresence
                exitBeforeEnter
                onExitComplete={handleExitComplete}
              >
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </SessionProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
