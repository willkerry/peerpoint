import { useMantineTheme, Avatar as MantineAvatar } from "@mantine/core";
import Avatar from "boring-avatars";

const PlaceholderAvatar: React.FC<{ seed: string }> = ({ seed }) => {
  const theme = useMantineTheme();
  return (
    <MantineAvatar size={18}>
      <Avatar
        name={seed}
        colors={[
          theme.colors.cyan[3],
          theme.colors.grape[3],
          theme.colors.green[3],
          theme.colors.indigo[3],
          theme.colors.lime[3],
          theme.colors.orange[3],
          theme.colors.pink[3],
          theme.colors.red[3],
          theme.colors.teal[3],
          theme.colors.violet[3],
        ]}
        variant="beam"
        size={18}
      />
    </MantineAvatar>
  );
};

export default PlaceholderAvatar;
