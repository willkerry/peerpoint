import { useForm } from "@mantine/form";
import { Challenge } from "@prisma/client";
import { useState } from "react";

import { CreateFormValues, submitHandler } from "../../utils/form-handlers/create-form-handlers";
import { ChallengeForm } from "../inputs";

type EditProps = {
  challenge: Challenge;
};

const Edit: React.FC<EditProps> = ({ challenge }) => {
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<CreateFormValues>({
    initialValues: {
      title: challenge.title,
      language: challenge.language,
      skeleton: challenge.skeleton,
      expectedOutput: challenge.expectedOutput,
    },
  });

  const onSubmit = submitHandler(
    form,
    setSubmitting,
    setExecuting,
    setSuccess,
    challenge.id
  );

  return (
    <ChallengeForm
      {...{
        form,
        onSubmit,
        isEditForm: true,
        isModal: true,
        executing,
        setExecuting,
        submitting,
        setSubmitting,
        success,
        setSuccess,
      }}
    />
  );
};

export default Edit;
