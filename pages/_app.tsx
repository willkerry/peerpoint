import { useEffect } from "react";

import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";

import "@ibm/plex/css/ibm-plex.css";
import { hasCookie, setCookie } from "cookies-next";
import { nanoid } from "nanoid";
import { SessionProvider } from "next-auth/react";

import { peerpointTheme } from "../lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  // Dark mode
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "peerpoint-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const router = useRouter();

  useEffect(() => {
    if (!hasCookie("pp-client-cookie")) setCookie("pp-client-cookie", nanoid());
    console.warn("Top level useEffect called");
  }, []);

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
          {...{ theme: { colorScheme, ...peerpointTheme } }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} key={router.route} />
            </SessionProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
