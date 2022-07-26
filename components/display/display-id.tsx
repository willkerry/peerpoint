import { Box, Text } from "@mantine/core";

const DisplayId = ({ id }) => {
  const idString = String(id).padStart(5, "0");
  return (
    <Box sx={{ display: "inline-block" }}>
      <Text sx={{ display: "inline" }} weight={500} color="dimmed">
        ID{" "}
      </Text>
      <Text
        sx={{
          display: "inline",
          fontVariant: "tabular-nums slashed-zero",
        }}
        weight={500}
      >
        {idString}
      </Text>
    </Box>
  );
};

export default DisplayId;
