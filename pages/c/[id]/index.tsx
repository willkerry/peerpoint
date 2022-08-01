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
import { submitHandler, resultModal } from "../../../utils/run/handlers";
import RunControls from "../../../components/inputs/run-controls";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id, fetchChallenge);

  const [userCode, setUserCode] = useState(data?.skeleton);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showResult, setShowResult] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (showResult) resultModal(setShowResult, output);
  }, [output, showResult]);

  if (status === "loading") return <LoadingOverlay visible />;

  const postBelongsToUser = session?.user?.email === data?.author?.email;

  const handleSubmit = submitHandler(
    setIsSubmitting,
    setOutput,
    data,
    userCode,
    setShowResult
  );

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

      <form onSubmit={handleSubmit} id="codexec">
        <CodeEditor
          label="Code editor"
          language={data?.language}
          editable={!isSubmitting}
          value={data?.skeleton}
          onChange={(value) => setUserCode(value)}
        />
        <RunControls
          {...{
            privileged: Boolean(session) && postBelongsToUser,
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
