import { Group, LoadingOverlay, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { IdButton } from "../../../components/display";
import { CodeEditor } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import { resultModal } from "../../../utils/run/handlers";
import RunControls from "../../../components/inputs/run-controls";
import { useForm } from "@mantine/form";
import { sendExecuteRequest } from "../../../utils";

const Post: React.FC = () => {
  // Get challenge ID from URL
  const router = useRouter();
  const { id } = router.query;

  // Fetch challenge data
  const { data } = useSWR(id, fetchChallenge);

  // Get user session
  const { data: session } = useSession();
  const userHasSession = Boolean(session);
  const challengeBelongsToUser = session?.user?.email === data?.author?.email;

  // Establish useStates
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
    console.log("useEffect called");
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
      <LoadingOverlay visible={isSubmitting} />
      <Meta title={data?.title} />

      <Title order={4} mb={12}>
        <Group position="apart" align="center">
          {data?.title}
          <IdButton id={data?.id} />
        </Group>
      </Title>

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
