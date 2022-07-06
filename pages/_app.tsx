import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
};

export default App;
