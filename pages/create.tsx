import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import Router from "next/router";
import React, { useState } from "react";
import Layout from "../components/layout";
import Meta from "../components/meta";
import CodeEditor from "../components/code-editor";
import LanguageSelect from "../components/language-select";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [skeleton, setSkeleton] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, skeleton, expectedOutput };
      await fetch(`/api/c`, {
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
      <Meta title="Create new challenge" />
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
            {/* Not controlled! Just for show. */}
            <LanguageSelect required label="Language" />

            <CodeEditor
              label="Skeleton"
              description="
                This is what appears in students’ code editors. Include 
                instructions (commented out), and any necessary boilerplate or 
                variables."
              value={skeleton}
              onChange={(value) => setSkeleton(value)}
              required
            />
            <CodeEditor
              label="Expected output"
              description="
                The stdout of student submissions is (fuzzily) checked against 
                this value, and matches are considered successful."
              value={expectedOutput}
              onChange={(value) => setExpectedOutput(value)}
              required
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
