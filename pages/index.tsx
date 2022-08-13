import { Alert, Grid, Skeleton, Stack } from "@mantine/core";

import useSWR from "swr";

import ChallengePreview from "../components/display/challenge-preview";
import FindChallenge from "../components/inputs/find-challenge";
import { Layout } from "../components/layout";
import fetchChallenges from "../lib/fetchers/fetch-challenges";

const Index: React.FC = () => {
  const { data, error } = useSWR("/", fetchChallenges);
  return (
    <Layout>
      <Stack spacing="lg">
        <FindChallenge />
        <Alert
          title="For evaluation purposes, recent user-generated challenges are previewed
        below"
        >
          This isn’t representative of Peerpoint’s intended use.
        </Alert>

        <Grid>
          {data && !error ? (
            data.map((ch) => (
              <Grid.Col md={3} xs={6} key={ch.id}>
                <ChallengePreview challenge={ch} />
              </Grid.Col>
            ))
          ) : (
            <>
              <Grid.Col md={3} xs={6}>
                <Skeleton height={200} />
              </Grid.Col>
              <Grid.Col md={3} xs={6}>
                <Skeleton height={180} />
              </Grid.Col>
              <Grid.Col md={3} xs={6}>
                <Skeleton height={190} />
              </Grid.Col>
              <Grid.Col md={3} xs={6}>
                <Skeleton height={210} />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Index;
