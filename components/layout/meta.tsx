import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Meta = ({ title = "Peerpoint" }: Props) => (
  <Head>
    <title>{title}</title>

    <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/manifest.webmanifest" />
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#000000"
    />
  </Head>
);

export default Meta;
