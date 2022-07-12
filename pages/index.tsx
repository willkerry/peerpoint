import React from "react";
import { Alert, Grid } from "@mantine/core";
import Layout from "../components/layout";
import Post, { PostProps } from "../components/post";
import prisma from "../lib/prisma";
import Meta from "../components/meta";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
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
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Meta title="Peerpoint" />
      <Alert
        title="For evaluation purposes, recent user-generated challenges aree previewed
        below"
        mb={12}
      >
        This isn’t representative of Peerpoint’s intended use.
      </Alert>
      <Grid>
        {props.feed.map((post) => (
          <Grid.Col md={3} xs={6} key={post.id}>
            <Post post={post} />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};

export default Blog;
