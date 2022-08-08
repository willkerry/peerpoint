import { Badge, Code, Group, useMantineTheme } from "@mantine/core";
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
        top: 0,
        left: 0,
        padding: theme.spacing.xs,
      }}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      exit={{ y: 40 }}
      transition={{ duration: 0.6 }}
    >
      <Group>
        <Badge
          sx={{ paddingLeft: 0 }}
          leftSection={<PlaceholderAvatar seed={attempt.cookie} />}
          color={attempt.success ? "green" : "red"}
        >
          {readableHash(attempt.cookie)}
        </Badge>

        <Code>{attempt.output}</Code>
      </Group>
    </motion.div>
  );
};

export default SubmissionFeedItem;
