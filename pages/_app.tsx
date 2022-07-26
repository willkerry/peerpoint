import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import "inter-ui";
import { createContext } from "react";

const peerpointTheme: MantineThemeOverride = {
  primaryColor: "orange",
  fontFamily:
    "Inter var,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  headings: { fontFamily: "inherit" },
};

const LoadingContext = createContext<boolean>(false);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LoadingContext.Provider value={true}>
      <MantineProvider theme={peerpointTheme} withGlobalStyles withNormalizeCSS>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </LoadingContext.Provider>
  );
};

export default App;
