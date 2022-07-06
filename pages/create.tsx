import React, { useState } from "react";
import Layout from "../components/layout";
import Router from "next/router";
import {
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [skeleton, setSkeleton] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, brief, skeleton, expectedOutput };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <Stack>
            <Title order={1}>New challenge</Title>
            <TextInput
              autoFocus
              required
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              type="text"
              value={title}
            />
            <Textarea
              description="This field accepts Markdown"
              required
              autosize
              cols={50}
              onChange={(e) => setBrief(e.target.value)}
              label="Brief"
              rows={8}
              value={brief}
            />
            <Textarea
              required
              autosize
              cols={50}
              label="Expected output"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              rows={8}
              styles={(theme) => ({
                input: {
                  backgroundColor: theme.colors.gray[9],
                  color: theme.colors.gray[1],
                  fontFamily: theme.fontFamilyMonospace,
                },
              })}
            />
            <Textarea
              autosize
              cols={50}
              label="Skeleton"
              value={skeleton}
              onChange={(e) => setSkeleton(e.target.value)}
              description="A starting point for the implementation"
              rows={8}
              styles={(theme) => ({
                input: {
                  backgroundColor: theme.colors.gray[9],
                  color: theme.colors.gray[1],
                  fontFamily: theme.fontFamilyMonospace,
                },
              })}
            />
            <Group>
              <Button disabled={!expectedOutput || !title} type="submit">
                Create
              </Button>
              <Button variant="subtle" onClick={() => Router.push("/")}>
                Cancel
              </Button>
            </Group>
          </Stack>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
