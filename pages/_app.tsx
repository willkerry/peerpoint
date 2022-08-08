import "@ibm/plex";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { peerpointTheme } from "../lib/theme";

const App = ({ Component, pageProps }: AppProps) => {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const router = useRouter();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

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
