import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useSession } from "next-auth/react";
import useSWR from "swr";

import EmptyState from "../../../components/display/empty-state";
import CodeEditor from "../../../components/inputs/code-editor";
import RunControls from "../../../components/inputs/run-controls";
import { Layout, TitleGroup } from "../../../components/layout";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import type { SubmissionResponse } from "../../../types/Submission";
import { executeChallenge } from "../../../utils";
import { resultModal } from "../../../utils/form-handlers/run-form-handlers";

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
    const response = await executeChallenge(
      data?.id,
      data?.language,
      form.values.userCode
    );
    setOutput(response);
    setIsSubmitting(false);
    setShowResult(true);
  };

  return (
    <Layout
      loading={isSubmitting}
      title={data?.title ?? "Peerpoint Challenge"}
      noPad
    >
      {error ? (
        <EmptyState />
      ) : (
        <Box sx={{ height: "calc(1vh - 150px)" }}>
          <Box px="sm" py="xs" sx={{ height: 100 }}>
            <TitleGroup
              compact
              area="Challenge"
              title={data?.title}
              id={data?.id}
            />
          </Box>
          <form id="exec" onSubmit={form.onSubmit(handleSubmit)}>
            <CodeEditor
              fullWidth
              editable={!isSubmitting}
              language={data?.language}
              {...form.getInputProps("userCode")}
            />
          </form>
        </Box>
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
