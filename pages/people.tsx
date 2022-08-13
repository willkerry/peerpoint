import { Group, TypographyStylesProvider } from "@mantine/core";

import { shuffle } from "lodash";
import { GetStaticProps } from "next";

import PlaceholderAvatar from "../components/display/placeholder-avatar";
import { Layout, TitleGroup } from "../components/layout";
import { adjectives } from "../lib/adjectives";
import { nouns } from "../lib/nouns";

type Props = {
  names: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const names = [];
  adjectives.forEach((a) => {
    nouns.forEach((n) => {
      names.push(`${a} ${n}`);
    });
  });
  return { props: { names: shuffle(names) } };
};

const People = ({ names }: Props) => (
  <Layout title="People">
    <TitleGroup title="Here’s every Peerpoint pseudonym" area="About" />
    <TypographyStylesProvider>
      <p>
        Here are all the user pseudonyms. These are assigned to users by passing
        their session UUIDs through a lightweight hashing function.
      </p>
      <ol>
        {names.map((p) => (
          <li key={p}>
            <Group spacing={4} ml="xs">
              <PlaceholderAvatar seed={p} />
              {p}
            </Group>
          </li>
        ))}
      </ol>
    </TypographyStylesProvider>
  </Layout>
);

export default People;
