import React, { forwardRef } from "react";
import {
  DefaultProps,
  MantineColor,
  createStyles,
  useMantineDefaultProps,
} from "@mantine/styles";
import { Box } from "@mantine/core";

export interface VarStylesParams {
  color: MantineColor;
}

export interface VarProps
  extends DefaultProps,
    React.ComponentPropsWithoutRef<"mark"> {
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
  const { color, className, ...others } = useMantineDefaultProps(
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
