import { Box, Center, Paper, Text } from "@mantine/core";
import { useDebouncedValue, useInterval } from "@mantine/hooks";
import { Attempt } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import SubmissionFeedItem from "./submission-feed-item";

const SubmissionFeed: React.FC<{ attempts: Attempt[] }> = ({ attempts }) => {
  const [index, setIndex] = useState(0);
  const [debouncedAttempts] = useDebouncedValue(attempts, 500);

  const interval = useInterval(
    () =>
      debouncedAttempts && debouncedAttempts.length > 0
        ? setIndex((i) => (i + 1) % debouncedAttempts.length)
        : setIndex(0),
    3500
  );

  useEffect(() => {
    interval.start();
    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAttempts]);

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
          {debouncedAttempts && debouncedAttempts.length > 0 ? (
            <SubmissionFeedItem
              key={debouncedAttempts[index].id}
              attempt={debouncedAttempts[index]}
            />
          ) : (
            <Center sx={{ position: "absolute", inset: 0 }}>
              <Text size="xs" color="dimmed">
                No submissions
              </Text>
            </Center>
          )}
        </AnimatePresence>
      </Paper>
    </Box>
  );
};

export default SubmissionFeed;
