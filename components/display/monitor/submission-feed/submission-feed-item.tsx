import { Badge, Code, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { Attempt } from "@prisma/client";
import { motion } from "framer-motion";
import ago from "s-ago";

import readableHash from "../../../../utils/readable-hash";
import PlaceholderAvatar from "../placeholder-avatar";

const SubmissionFeedItem: React.FC<{ attempt: Attempt }> = ({ attempt }) => {
  const theme = useMantineTheme();
  const compactCode = attempt.output.replace(/\n/g, " ").trim();
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
    >
      <Stack spacing={6}>
        <Code
          block
          sx={(theme) => ({
            fontSize: theme.fontSizes.xs,
            fontWeight: 500,
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingTop: 4,
            paddingBottom: 4,
            whiteSpace: "nowrap",
            overflow: "",
          })}
        >
          {compactCode}
        </Code>
        <Group spacing="xs">
          <Group spacing={4} sx={(theme) => ({ fontSize: theme.fontSizes.xs })}>
            <PlaceholderAvatar seed={attempt.cookie} />
            <Text weight={500}>{readableHash(attempt.cookie)}</Text>
            <Text color="dimmed">{ago(attempt.createdAt)}</Text>
          </Group>

          <Badge
            variant="dot"
            color={
              attempt.success
                ? "green"
                : attempt.success === false
                ? "red"
                : "red"
            }
          >
            {attempt.success
              ? "Correct"
              : attempt.success === false
              ? "Incorrect"
              : "Error"}
          </Badge>
        </Group>
      </Stack>
    </motion.div>
  );
};

export default SubmissionFeedItem;
