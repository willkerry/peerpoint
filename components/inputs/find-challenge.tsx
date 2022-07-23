import {
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  Text,
  Skeleton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CheckIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useChallenge from "../../utils/useChallenge";

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
  const { exists, title, isLoading } = useChallenge(
    Number(form.values.challenge)
  );
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  console.log(exists, title, isLoading);

  const RightSection = () => {
    return (
      <Skeleton visible={isLoading} mr={10}>
        {exists && (
          <Text
            color="dimmed"
            align="right"
            weight={500}
            size="sm"
            lineClamp={1}
          >
            <Text component="span" color="green">
              <CheckIcon />
            </Text>{" "}
            <span>{title}</span>
          </Text>
        )}
      </Skeleton>
    );
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setIsRedirecting(true);
        router.push(`/c/${values.challenge}`);
      })}
    >
      <NumberInput
        label="Enter a challenge ID"
        hideControls
        size="md"
        rightSection={<RightSection />}
        rightSectionWidth={200}
        onKeyUp={form.validate}
        {...form.getInputProps("challenge")}
      />

      <Group position="right" mt="md">
        <Button type="submit" disabled={!exists}>
          Go
        </Button>
      </Group>
      <LoadingOverlay visible={isRedirecting} />
    </form>
  );
};

export default FindChallenge;
