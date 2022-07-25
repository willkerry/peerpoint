import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import "@fontsource/inter/variable-full.css";

const peerpointTheme: MantineThemeOverride = {
  primaryColor: "orange",
  fontFamily:
    "Inter, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={peerpointTheme} withGlobalStyles withNormalizeCSS>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
};

export default App;
