import {
  Badge,
  Code,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { Attempt } from "@prisma/client";
import { motion } from "framer-motion";
import ago from "s-ago";

import { readableHash } from "../../../../utils/readable-hash";
import PlaceholderAvatar from "../placeholder-avatar";

type SubmissionFeedItemProps = {
  attempt: Attempt;
};

const SubmissionFeedItem: React.FC<SubmissionFeedItemProps> = ({
  attempt,
}: SubmissionFeedItemProps) => {
  const theme = useMantineTheme();
  const compactCode = attempt.output.replace(/\n/g, " ").trim();
  const date = new Date(attempt.createdAt);
  return (
    <motion.div
      key={attempt.id}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.xs,
      }}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      exit={{ y: 70 }}
    >
      <Stack spacing={6}>
        <Code
          block
          sx={{
            fontSize: theme.fontSizes.xs,
            fontWeight: 500,
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingTop: 4,
            paddingBottom: 4,
            whiteSpace: "nowrap",
            overflow: "",
          }}
        >
          {compactCode || "No output"}
        </Code>
        <Group spacing="xs">
          <Group spacing={4} sx={{ fontSize: theme.fontSizes.xs }}>
            <PlaceholderAvatar seed={attempt.cookie} />
            <Text weight={500}>{readableHash(attempt.cookie)}</Text>
            <Text color="dimmed">{ago(date)}</Text>
          </Group>

          <Badge variant="dot" color={attempt.success ? "green" : "red"}>
            {attempt.success ? "Correct" : "Incorrect"}
          </Badge>
        </Group>
      </Stack>
    </motion.div>
  );
};

export default SubmissionFeedItem;
