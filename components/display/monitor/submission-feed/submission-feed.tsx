import { Box, Paper, Text } from "@mantine/core";
import { Attempt } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { useRandomInterval } from "../../../../utils/hooks";
import SubmissionFeedItem from "./submission-feed-item";

const SubmissionFeed: React.FC<{ attempts: Attempt[] }> = ({ attempts }) => {
  const [index, setIndex] = useState(0);
  useRandomInterval(
    () => setIndex((i) => (i + 1) % attempts.length),
    2000,
    4000
  );
  return (
    <Box>
      <Text size="sm" weight={500} mb={2}>
        Latest submissions
      </Text>
      <Paper
        p="xs"
        withBorder
        color="red"
        sx={{ overflow: "hidden", position: "relative", height: 72 }}
      >
        <AnimatePresence>
          <SubmissionFeedItem
            key={attempts[index].id}
            attempt={attempts[index]}
          />
        </AnimatePresence>
      </Paper>
    </Box>
  );
};

export default SubmissionFeed;
