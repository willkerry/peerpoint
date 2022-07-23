import {
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import useChallenge from "../../utils/useChallenge";
import { Skeleton } from "@mantine/core";

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

  const RightSection = () => {
    return (
      <Skeleton visible={isLoading} mr={10}>
        <Group position="right">
          <Text color="dimmed" align="right" weight={500} size="sm">
            {title}
          </Text>
        </Group>
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
        label="Find a challenge"
        description="Enter a numerical challenge ID"
        hideControls
        size="md"
        rightSection={<RightSection />}
        rightSectionWidth={200}
        onKeyUp={form.validate}
        {...form.getInputProps("challenge")}
      />
      <Group position="right" mt="md">
        <Button type="submit" size="md">
          Go
        </Button>
      </Group>
      <LoadingOverlay visible={isRedirecting} />
    </form>
  );
};

export default FindChallenge;
