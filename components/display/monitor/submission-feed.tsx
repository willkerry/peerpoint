import { Paper, Stack, Text } from "@mantine/core";
import { Attempt } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRandomInterval } from "../../../utils/hooks";
import SubmissionFeedItem from "./submission-feed-item";

const SubmissionFeed: React.FC<{ attempts: Attempt[] }> = ({ attempts }) => {
  const [index, setIndex] = useState(0);
  useRandomInterval(
    () => setIndex((i) => (i + 1) % attempts.length),
    2000,
    4000
  );
  return (
    <Paper
      p="xs"
      withBorder
      color="red"
      sx={{ overflow: "hidden", position: "relative", height: 64 }}
    >
      <Text
        size="xs"
        color="dimmed"
        sx={(theme) => ({
          top: 0,
          position: "absolute",
          left: 0,
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          paddingTop: 6,
          backdropFilter: "blur(10px)",
          zIndex: 1,
        })}
      >
        Live submissions
      </Text>
      <AnimatePresence>
        <SubmissionFeedItem
          key={attempts[index].id}
          attempt={attempts[index]}
        />
      </AnimatePresence>
    </Paper>
  );
};

export default SubmissionFeed;
