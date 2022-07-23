import { Alert, Grid, Stack } from "@mantine/core";
import type { Challenge } from "@prisma/client";
import type { GetServerSideProps } from "next";
import React from "react";
import ChallengePreview from "../components/challenge-preview";
import FindChallenge from "../components/inputs/find-challenge";
import Layout from "../components/layout/layout";
import Meta from "../components/meta";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.challenge.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed: JSON.parse(JSON.stringify(feed)) },
  };
};

type Props = {
  feed: Challenge[];
};

const Blog: React.FC<Props> = (props) => {
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
          {props.feed.map((post) => (
            <Grid.Col md={3} xs={6} key={post.id}>
              <ChallengePreview post={post} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Blog;
