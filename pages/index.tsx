import { Alert, Grid, Skeleton, Stack } from "@mantine/core";
import type { Challenge } from "@prisma/client";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import ChallengePreview from "../components/challenge-preview";
import FindChallenge from "../components/inputs/find-challenge";
import Layout from "../components/layout/layout";
import Meta from "../components/meta";
import getter from "../lib/getter";

type Props = {
  feed: Challenge[];
};

const Blog: React.FC<Props> = () => {
  const { data, error }: SWRResponse<Challenge[] | any> = useSWR(
    "/api/c",
    getter
  );

  return (
    <Layout>
      <Meta title="Peerpoint" />
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
            data.map((post) => (
              <Grid.Col md={3} xs={6} key={post.id}>
                <ChallengePreview post={post} />
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

export default Blog;
