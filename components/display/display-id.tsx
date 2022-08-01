import { Box, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export type DisplayIDProps = {
  id: number;
};

const DisplayId: React.FC<DisplayIDProps> = ({ id }: DisplayIDProps) => {
  const [idString, setIdString] = useState("00000");
  useEffect(() => {
    id && setIdString(String(id).padStart(5, "0"));
  }, [id]);
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
