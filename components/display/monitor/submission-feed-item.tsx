import { Badge, Box, Code, Group, useMantineTheme } from "@mantine/core";
import { Attempt } from "@prisma/client";
import { motion } from "framer-motion";
import readableHash from "../../../utils/readable-hash";
import PlaceholderAvatar from "./placeholder-avatar";

const SubmissionFeedItem: React.FC<{ attempt: Attempt }> = ({ attempt }) => {
  const theme = useMantineTheme();

  return (
    <motion.div
      key={attempt.id}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: theme.spacing.xs,
      }}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      exit={{ y: 40 }}
    >
      <Group sx={{ fontSize: theme.fontSizes.sm }} spacing="xs">
        <Badge color={attempt.success ? "green" : "red"} size="lg">
          {attempt.success ? "Correct output" : "Error"}
        </Badge>
        from
        <Group
          spacing={4}
          // color={attempt.success ? "green" : "red"}
        >
          <PlaceholderAvatar seed={attempt.cookie} />
          {readableHash(attempt.cookie)}
        </Group>
        scored
        <Code>{attempt.output}</Code>
      </Group>
    </motion.div>
  );
};

export default SubmissionFeedItem;
