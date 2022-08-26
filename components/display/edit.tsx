import { useState } from "react";

import { useForm } from "@mantine/form";

import { Challenge } from "@prisma/client";

import { submitHandler } from "../../utils/form-handlers/create-form-handlers";
import type { CreateFormValues } from "../../utils/form-handlers/create-form-handlers";
import ChallengeForm from "../inputs/challenge-form";

type EditProps = {
  challenge: Challenge;
};

const Edit: React.FC<EditProps> = ({ challenge }: EditProps) => {
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<CreateFormValues>({
    initialValues: {
      title: challenge.title,
      language: challenge.language,
      skeleton: challenge.skeleton,
      instructions: challenge.instructions,
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
