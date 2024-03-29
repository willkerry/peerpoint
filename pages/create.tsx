import { useState } from "react";

import { useForm } from "@mantine/form";

import ChallengeForm from "../components/inputs/challenge-form";
import { Layout, TitleGroup } from "../components/layout";
import { submitHandler } from "../utils/form-handlers/create-form-handlers";
import type { CreateFormValues } from "../utils/form-handlers/create-form-handlers";

const Create: React.FC = () => {
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<CreateFormValues>({
    initialValues: {
      title: "",
      language: null,
      skeleton: "",
      expectedOutput: "",
    },
  });

  const onSubmit = submitHandler(form, setSubmitting, setExecuting, setSuccess);

  return (
    <Layout loading={submitting || executing} title="Create new challenge">
      <TitleGroup area="Create a challenge" title="New challenge" />
      <ChallengeForm
        {...{
          form,
          onSubmit,
          executing,
          setExecuting,
          submitting,
          setSubmitting,
          success,
          setSuccess,
        }}
      />
    </Layout>
  );
};

export default Create;
