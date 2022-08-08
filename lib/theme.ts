import { MantineThemeOverride } from "@mantine/core";

export const peerpointTheme: MantineThemeOverride = {
  primaryColor: "orange",
  dateFormat: "DD/MM/YYYY",
  fontFamily:
    "IBM Plex Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  headings: { fontFamily: "inherit", fontWeight: 600 },
  fontFamilyMonospace:
    "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;",
  components: {
    Code: {
      styles: (theme) => ({
        block: {
          backgroundColor: theme.colors.dark[8],
          color: theme.colors.gray[4],
          fontSize: theme.fontSizes.sm,
        },
      }),
    },
  },
};
