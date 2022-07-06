import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/layout";
import Post, { PostProps } from "../components/post";
import prisma from "../lib/prisma";
import { Grid } from "@mantine/core";

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
      <Grid>
        {props.feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Grid>
    </Layout>
  );
};

export default Blog;
