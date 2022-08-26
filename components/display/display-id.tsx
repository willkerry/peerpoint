import { Box, Text } from "@mantine/core";

export type Props = { id: number };

const DisplayId: React.FC<Props> = ({ id }: Props) => (
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
      {id?.toString().padStart(5, "0")}
    </Text>
  </Box>
);

export default DisplayId;
