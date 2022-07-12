import {
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import Router from "next/router";
import React, { useState } from "react";
import Layout from "../components/layout";
import Meta from "../components/meta";
import CodeEditor from "../components/code-editor";
import LanguageSelect from "../components/language-select";

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
            <Textarea
              description="One sentence describing the task."
              required
              autosize
              cols={50}
              onChange={(e) => setBrief(e.target.value)}
              label="Brief description"
              rows={8}
              value={brief}
            />

            {/* Not controlled! Just for show. */}
            <LanguageSelect label="Language" />

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
