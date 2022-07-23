import React from "react";
import { Alert, Grid } from "@mantine/core";
import Layout from "../components/layout/layout";
import ChallengePreview from "../components/challenge-preview";
import prisma from "../lib/prisma";
import Meta from "../components/meta";

import type { GetServerSideProps } from "next";
import type { Challenge } from "@prisma/client";
import FindChallenge from "../components/inputs/find-challenge";

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
      <FindChallenge />
      <Alert
        title="For evaluation purposes, recent user-generated challenges are previewed
        below"
        mb={12}
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
    </Layout>
  );
};

export default Blog;
