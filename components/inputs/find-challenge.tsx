import { NumberInput, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import useChallenge from "../../utils/useChallenge";
import { useDebouncedValue } from "@mantine/hooks";
import { ArrowRightIcon } from "@primer/octicons-react";

const FindChallenge = () => {
  const form = useForm({
    initialValues: { challenge: null },
    validate: {
      challenge: (value) =>
        isNaN(Number(value))
          ? "Not a number"
          : exists
          ? null
          : "Challenge not found",
    },
  });
  const [debounced] = useDebouncedValue(Number(form.values.challenge), 200);
  const { exists, isLoading } = useChallenge(debounced);
  const router = useRouter();

  const submitButton = (
    <ActionIcon
      type="submit"
      size="lg"
      loading={form.values.challenge && isLoading}
    >
      <ArrowRightIcon />
    </ActionIcon>
  );

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        router.push(`/c/${values.challenge}`);
      })}
    >
      <NumberInput
        label="Find a challenge"
        size="md"
        description="Enter a numerical challenge ID"
        hideControls
        rightSection={submitButton}
        rightSectionWidth={42}
        mb={12}
        {...form.getInputProps("challenge")}
      />
    </form>
  );
};

export default FindChallenge;
