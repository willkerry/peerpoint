import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Meta = ({ title = "Peerpoint" }: Props) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
