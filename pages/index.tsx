import React from "react";
import { Alert, Grid } from "@mantine/core";
import Layout from "../components/layout/layout";
import Challenge from "../components/challenge";
import prisma from "../lib/prisma";
import Meta from "../components/meta";

import type { GetServerSideProps } from "next";
import type { Challenge } from "@prisma/client";

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
            <Challenge post={post} />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};

export default Blog;
