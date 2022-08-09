import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../types/Submission";
import { EmptyState } from "../../../components/display";
import { CodeEditor } from "../../../components/inputs";
import RunControls from "../../../components/inputs/run-controls";
import { Layout, TitleGroup } from "../../../components/layout/";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import { sendExecuteRequest } from "../../../utils";
import { resultModal } from "../../../utils/run/handlers";

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
  const form = useForm({ initialValues: { userCode: "" } });

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
    <Layout loading={isSubmitting} title={data?.title ?? "Peerpoint Challenge"}>
      {error ? (
        <EmptyState />
      ) : (
        <Grid>
          <Grid.Col span={12}>
            <TitleGroup
              area="Challenge"
              title={data?.title}
              id={String(data?.id)}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <form id="exec" onSubmit={form.onSubmit(handleSubmit)}>
              <CodeEditor
                label="Code editor"
                editable={!isSubmitting}
                language={data?.language}
                {...form.getInputProps("userCode")}
              />
            </form>
          </Grid.Col>
        </Grid>
      )}
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
    </Layout>
  );
};

export default Post;
