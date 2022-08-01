import { Button, Code, Group, Skeleton, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { EmptyState, IdButton } from "../../../components/display";
import { CodeEditor } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import { resultModal } from "../../../utils/run/handlers";
import RunControls from "../../../components/inputs/run-controls";
import { useForm } from "@mantine/form";
import { sendExecuteRequest } from "../../../utils";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconCode } from "@tabler/icons";
import { Grid } from "@mantine/core";

const Post: React.FC = () => {
  // Get challenge ID from URL
  const router = useRouter();
  const { id } = router.query;

  // Fetch challenge data
  const { data, error } = useSWR(id, fetchChallenge);

  // Get user session
  const { data: session } = useSession();
  const userHasSession = Boolean(session);
  const challengeBelongsToUser = session?.user?.email === data?.author?.email;

  // Initialise useStates
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showResult, setShowResult] = useState(false);
  const [expectedOutputOpened, expectedOutputHandlers] = useDisclosure(false);
  const ref = useClickOutside(() => expectedOutputHandlers.close());
  // Initialise form
  const form = useForm({
    initialValues: {
      userCode: "",
    },
  });

  // Populate form with challenge skeleton when it loads
  useEffect(() => {
    if (data?.skeleton) form.setFieldValue("userCode", data.skeleton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.skeleton]);

  // Launch result modal when showResult is true
  useEffect(() => {
    if (showResult) resultModal(setShowResult, output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult]);

  /*
   * Call client-side code execution function when form is submitted
   * (Error handling happens there.)
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const response = await sendExecuteRequest(
      data?.id,
      data?.language,
      form.values.userCode
    );
    setOutput(response);
    setIsSubmitting(false);
    setShowResult(true);
  };

  return (
    <Layout>
      <Meta title={data?.title ?? "Peerpoint Challenge"} />
      {error ? (
        <EmptyState />
      ) : (
        <Grid>
          <Grid.Col span={12}>
            <Group position="apart" noWrap mb={16}>
              {!data ? (
                <Skeleton />
              ) : (
                <Title
                  order={4}
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data?.title}
                </Title>
              )}
              <IdButton id={data?.id} />
            </Group>
          </Grid.Col>

          <Grid.Col span={12}>
            <form id="exec" onSubmit={form.onSubmit(handleSubmit)}>
              <CodeEditor
                label="Code editor"
                language={data?.language}
                {...form.getInputProps("userCode")}
              />
            </form>
          </Grid.Col>

          <Grid.Col sm={4}>
            <Button
              variant="subtle"
              leftIcon={<IconCode />}
              ref={ref}
              onClick={expectedOutputHandlers.toggle}
            >
              What’s the expected output?
            </Button>
          </Grid.Col>
          <Grid.Col sm={8}>
            {expectedOutputOpened && (
              <Code ref={ref} block>
                {data?.expectedOutput}
              </Code>
            )}
          </Grid.Col>
          <RunControls
            {...{
              privileged: userHasSession && challengeBelongsToUser,
              disabled: !form.values.userCode,
              isSubmitting,
              data,
              hasOutput: Boolean(output),
              setShowResult,
            }}
          />
        </Grid>
      )}
    </Layout>
  );
};

export default Post;
