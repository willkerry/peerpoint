import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/layout";
import Post from "../components/post";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import { SimpleGrid, Title } from "@mantine/core";
import { Challenge } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.challenge.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { drafts },
  };
};

type Props = {
  drafts: Challenge[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <Title mb="lg" order={1}>
          Your drafts
        </Title>
        <main>
          <SimpleGrid
            cols={2}
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {props.drafts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </SimpleGrid>
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
