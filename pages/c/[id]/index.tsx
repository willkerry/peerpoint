import {
  Center,
  Group,
  LoadingOverlay,
  Skeleton,
  Space,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { IdButton } from "../../../components/display";
import { CodeEditor, FindChallenge } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import { resultModal } from "../../../utils/run/handlers";
import RunControls from "../../../components/inputs/run-controls";
import { useForm } from "@mantine/form";
import { sendExecuteRequest } from "../../../utils";
import { IconTrafficCone } from "@tabler/icons";
import { useMantineTheme } from "@mantine/core";

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

  const theme = useMantineTheme();

  if (error)
    return (
      <Layout>
        <Stack my={64} spacing="sm">
          <Center>
            <IconTrafficCone
              size={56}
              stroke={1.5}
              color={theme.colors.orange[5]}
            />
          </Center>
          <Center>
            <Title order={1} color="">
              Challenge not found.
            </Title>
          </Center>
          <Center>
            <Text color="dimmed">Try another one.</Text>
          </Center>
          <Space h="xl" />
          <Center>
            <FindChallenge />
          </Center>
        </Stack>
      </Layout>
    );
  return (
    <Layout>
      <LoadingOverlay visible={isSubmitting || !data} />
      <Meta title={data?.title ?? "Peerpoint Challenge"} />

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
      <form id="exec" onSubmit={form.onSubmit(handleSubmit)}>
        <CodeEditor
          label="Code editor"
          language={data?.language}
          {...form.getInputProps("userCode")}
        />
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
      </form>
    </Layout>
  );
};

export default Post;
