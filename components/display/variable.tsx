import React, { forwardRef } from "react";

import { Box } from "@mantine/core";
import { createStyles, useComponentDefaultProps } from "@mantine/styles";
import type { DefaultProps, MantineColor } from "@mantine/styles";

export interface VarStylesParams {
  color: MantineColor;
}

export interface VarProps
  extends DefaultProps,
    React.ComponentPropsWithoutRef<"mark"> {
  // eslint-disable-next-line react/require-default-props
  color?: MantineColor;
}

const useStyles = createStyles((theme, { color }: VarStylesParams) => ({
  root: {
    backgroundColor: theme.fn.themeColor(
      color,
      theme.colorScheme === "dark" ? 8 : 1
    ),
    color: theme.fn.themeColor("pink", theme.colorScheme === "dark" ? 3 : 7),
    fontStyle: "inherit",
    fontFamily: theme.fontFamilyMonospace,
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
    borderRadius: theme.radius.sm,
    border: `1px solid ${theme.fn.themeColor(
      color,
      theme.colorScheme === "dark" ? 3 : 4
    )}`,
  },
}));

const defaultProps: Partial<VarProps> = {
  color: "gray",
};

export const Var = forwardRef<HTMLElement, VarProps>((props, ref) => {
  const { color, className, ...others } = useComponentDefaultProps(
    "Mark",
    defaultProps,
    props
  );

  const { classes, cx } = useStyles({ color }, { name: "Var" });

  return (
    <Box
      px={4}
      component="var"
      ref={ref}
      className={cx(classes.root, className)}
      {...others}
    />
  );
});

Var.displayName = "Variable";
