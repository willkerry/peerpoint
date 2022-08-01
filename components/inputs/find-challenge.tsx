import {
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  Box,
  Center,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import useChallenge from "../../utils/useChallenge";
import { Var } from "../display";
import { Loader } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

const FindChallenge: React.FC = () => {
  const form = useForm({
    initialValues: { challenge: null },
  });

  const [debounced] = useDebouncedValue(form.values.challenge, 1500);
  const { exists, title, isLoading } = useChallenge(debounced);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  return (
    <Box<"form">
      component="form"
      onSubmit={form.onSubmit((values) => {
        setIsRedirecting(true);
        router.push(`/c/${values.challenge}`);
      })}
      sx={{ width: `${100}%` }}
    >
      <NumberInput
        label="Enter a challenge ID"
        hideControls
        precision={0}
        size="md"
        sx={{
          fontVariantNumeric: "tabular-nums slashed-zero",
        }}
        onKeyUp={form.validate}
        {...form.getInputProps("challenge")}
      />

      <Group position="apart" mt="md" noWrap>
        <Center inline>
          {debounced && exists ? (
            <>
              <ThemeIcon color="green" variant="light" size="sm">
                <IconCheck size={14} stroke={3} />
              </ThemeIcon>
              <Box ml="xs">
                Challenge found <Var ml={5}>{title}</Var>
              </Box>
            </>
          ) : form.values.challenge && isLoading ? (
            <>
              <Loader size={14} />
              <Box ml="xs">Checking...</Box>
            </>
          ) : debounced && !exists ? (
            <>
              <ThemeIcon color="red" variant="light" size="sm">
                <IconX size={14} stroke={3} />
              </ThemeIcon>
              <Box ml="xs">Not found</Box>
            </>
          ) : null}
        </Center>
        <Button type="submit" variant="default" disabled={!exists}>
          Launch
        </Button>
      </Group>
      <LoadingOverlay visible={isRedirecting} />
    </Box>
  );
};

export default FindChallenge;
