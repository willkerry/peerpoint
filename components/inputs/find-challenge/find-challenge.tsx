import { ComponentProps, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Box, Button, Group, LoadingOverlay, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";

import { useChallenge } from "../../../utils/hooks";
import FindStatus from "./find-status";

const FindChallenge: React.FC = () => {
  // Initialise router object
  const router = useRouter();

  // Initialise the form
  const form = useForm({
    initialValues: { challenge: null },
  });

  // Debounced the input value to avoid unnecessary requests
  const [debounced] = useDebouncedValue(form.values.challenge, 3000);

  // Get the challenge from the API (in a hook)
  const { exists, title } = useChallenge(debounced);

  // Initialise the status useStates
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [status, setStatus] =
    useState<ComponentProps<typeof FindStatus>["status"]>();

  useEffect(() => {
    // When input changes, LOADING
    setStatus("loading");
    // When input is empty, IDLE
    if (!form.values.challenge) setStatus("idle");
  }, [form.values.challenge]);
  useEffect(() => {
    // When value is debounced and exists === true, SUCCESS
    if (debounced && exists) setStatus("success");
    // When value is debounced and exists === false, ERROR
    else if (debounced && !exists) setStatus("error");
  }, [debounced, exists]);

  // Redirect to challenge page when form submit action is triggered
  const handleSubmit = (values) => {
    setIsRedirecting(true);
    router.push(`/c/${values.challenge}`);
  };

  return (
    <Box<"form">
      component="form"
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
      sx={{ width: `${100}%` }}
      data-testid="find-challenge-form"
    >
      <NumberInput
        hideControls
        label="Enter a challenge ID"
        maxLength={5}
        onKeyUp={form.validate}
        size="md"
        data-testid="find-challenge-input"
        sx={{
          input: {
            fontVariantNumeric: "tabular-nums slashed-zero",
            fontSize: "1.5em",
            fontWeight: "300",
            letterSpacing: "0.1em",
          },
        }}
        {...form.getInputProps("challenge")}
      />
      <Group position="apart" mt="md" noWrap>
        <FindStatus status={status} title={title} />
        <Button
          type="submit"
          variant="default"
          disabled={!(status === "success")}
        >
          Launch
        </Button>
      </Group>
      <LoadingOverlay visible={isRedirecting} />
    </Box>
  );
};

export default FindChallenge;
