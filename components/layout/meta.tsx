import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const defaultProps: Props = {
  title: "Peerpoint",
  description:
    "Peerpoint is a platform for massively running code in lectures.",
};

const Meta: React.FC<Props> = ({ title, description }: Props) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />

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

Meta.defaultProps = defaultProps;

export default Meta;
