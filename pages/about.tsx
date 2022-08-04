import {
  Alert,
  Button,
  Container,
  Paper,
  TextInput,
  Text,
  TypographyStylesProvider,
  Skeleton,
  Radio,
  Group,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useState } from "react";
import { CodeEditor } from "../components/inputs";
import { Layout } from "../components/layout";
import { sleep } from "../utils";

const About: React.FC<null> = () => {
  const [demoCode, setDemoCode] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);
  const javaSnippet = `public class Foo {
        static int = 1;
        public static void main(String[] args) {
            System.out.print(i + ", ");
            m(i);
            System.out.print(i);
        }
        public void m(int i) {
            i += 2;
        }
    }`;
  const javaSnippet2 = `public class Foo {
        static int = 1;
        public static void main(String[] args) {
            System.out.print(i + ", ");
            m(i);
            System.out.print(i);
        }
        public void m(int i) {
            // YOUR ANSWER HERE
        }
    }`;
  return (
    <Layout title="About" loading={fakeLoading}>
      <Container size="xs">
        <TypographyStylesProvider>
          <h1>About Peerpoint</h1>
          <p>
            Peerpoint is an experimental{" "}
            <NextLink href="https://en.wikipedia.org/wiki/Audience_response#Audience_response_systems">
              clicker tool
            </NextLink>{" "}
            for beginner programming lectures.
          </p>
          <p>
            Conventionally, a clicker tool is deployed in lecture theatre to
            collect multiple-choice answers from a group of students. In a
            programming context, this leads to questions like:
          </p>
          <figure>
            <Paper p="xs" withBorder>
              <p>What is the output of the following code?</p>
              <pre>{javaSnippet}</pre>
              <Radio.Group label="Answer" value="3">
                <Radio value="1" label={<code>1, 3</code>} />
                <Radio value="2" label={<code>3, 1</code>} />
                <Radio value="3" label={<code>1, 1</code>} />
                <Radio value="4" label={<code>1, 0</code>} />
              </Radio.Group>
            </Paper>
            <figcaption>
              Example 1: a reliable, multiple-choice clicker question.
            </figcaption>
          </figure>
          <p>
            Newer clicker tools have swapped their proprietary client hardware
            for student smartphones, which allow for more complex input types. A
            teacher might rephrase the question to collect a text input answer:
          </p>
          <figure>
            <Paper p="xs" withBorder>
              <Text size="sm" weight={500}>
                Question
              </Text>
              <p>
                Complete the expression in method <code>m()</code> so that the
                main method outputs <code>1, 1</code>.
              </p>
              <pre>{javaSnippet2}</pre>
              <TextInput label="Answer" type="text" value="i += 2;" readOnly />
            </Paper>
            <figcaption>
              Example 2: a lecture question with a text answer. How many{" "}
              <em>incorrect</em> answers will give a correct program output?
            </figcaption>
          </figure>
          <p>
            In some ways, this is a compromise. The tools we use aren’t designed
            with code input in mind. We have to manually deal with certain
            oddities like stray curly quotes or unpredictable whitespace and
            newlines. We need to handle multiple semantically equivalent answers
            (e.g. <code>i += 2</code> and <code>i = i + 2</code>). For all that
            effort, the student experience of answering these questions is not
            spectacular.
          </p>
          <p>Peerpoint reframes the question like this:</p>
          <figure>
            <Paper p="xs" withBorder>
              <Text size="sm" weight={500}>
                Question
              </Text>
              <p>
                Complete the expression in method <code>m()</code> so that the
                main method outputs <code>1, 1</code>.
              </p>
              <Skeleton
                visible={fakeLoading}
                mb={demoCode || fakeLoading ? "xs" : 0}
              >
                {demoCode ? (
                  <Paper withBorder p="sm">
                    <Alert title="Wrong answer" variant="outline" color="red">
                      Your program ran successfully but produced the wrong
                      output.
                    </Alert>
                    <Text mt="lg" size="sm" weight={600}>
                      Your program’s output
                    </Text>
                    <pre>1, NaN</pre>
                  </Paper>
                ) : (
                  <CodeEditor value={javaSnippet2} language={62} />
                )}
              </Skeleton>

              <Group position="apart">
                <Button
                  variant="default"
                  compact
                  loading={fakeLoading}
                  disabled={demoCode}
                  onClick={async () => {
                    if (!demoCode) {
                      setFakeLoading(true);
                      await sleep(2000);
                      setDemoCode(true);
                      setFakeLoading(false);
                    }
                  }}
                >
                  Run
                </Button>
                <Button
                  variant="subtle"
                  compact
                  disabled={!demoCode}
                  onClick={() => setDemoCode(false)}
                >
                  Reset
                </Button>
              </Group>
            </Paper>
            <figcaption>
              Example 3: a Peerpoint challenge. (FYI, this figure’s a demo.)
            </figcaption>
          </figure>
          <h2>Hypothesis</h2>
          <p>
            This project compares this model of lecture theatre interaction with
            conventional lecture <em>clicker</em> tools.
          </p>
        </TypographyStylesProvider>
      </Container>
    </Layout>
  );
};

export default About;
