import { Avatar as MantineAvatar, useMantineTheme } from "@mantine/core";

import BoringAvatar from "boring-avatars";

type Props = {
  seed: string;
  size?: number;
};

const PlaceholderAvatar: React.FC<Props> = ({ seed, size }: Props) => {
  const theme = useMantineTheme();
  return (
    <MantineAvatar size={size}>
      <BoringAvatar
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
        size={size}
      />
    </MantineAvatar>
  );
};

PlaceholderAvatar.defaultProps = {
  size: 14,
};

export default PlaceholderAvatar;
