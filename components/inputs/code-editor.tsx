import {
  Box,
  Input,
  InputWrapperProps,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import dynamic from "next/dynamic";
import { Language, languageMap } from "../../@types/Language";
import LanguageIndicator from "../display/language-indicator";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <Skeleton height={30} radius="md" />,
});
type Props = ReactCodeMirrorProps &
  InputWrapperProps & {
    children?: React.ReactNode;
    language?: Language["id"];
  };

const defaultProps = {
  children: null,
};

const CodeEditor = ({ language, value, basicSetup, ...props }: Props) => {
  const theme = useMantineTheme();

  const CodeMirrorThemeExtension: Extension = EditorView.theme({
    "&": { fontSize: `${theme.fontSizes.sm}px` },
    ".cm-content": { fontFamily: theme.fontFamilyMonospace, fontWeight: 450 },
  });

  const l = languageMap.get(language)?.cm;
  const extensions = {
    extensions: l
      ? [loadLanguage(l), CodeMirrorThemeExtension]
      : [CodeMirrorThemeExtension],
  };

  const editorTheme = createTheme({
    theme: "dark",
    settings: {
      background: theme.colors.dark[8],
      foreground: theme.colors.gray[4],
      caret: theme.colors.gray[4],
      selection: theme.colors.dark[4],
      selectionMatch: theme.colors.dark[4],
      lineHighlight: theme.colors.dark[6],
    },
    styles: [
      { tag: [t.comment, t.bracket], color: "#8b949e" },
      { tag: [t.className, t.propertyName], color: "#d2a8ff" },
      {
        tag: [t.variableName, t.attributeName, t.number, t.operator],
        color: "#79c0ff",
      },
      {
        tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
        color: "#ff7b72",
      },
      { tag: [t.string, t.meta, t.regexp], color: "#a5d6ff" },
      { tag: [t.name, t.quote], color: "#7ee787" },
      { tag: [t.heading], color: "#d2a8ff", fontWeight: "bold" },
      { tag: [t.emphasis], color: "#d2a8ff", fontStyle: "italic" },
      { tag: [t.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
    ],
  });

  return (
    <Input.Wrapper
      label={props.label}
      description={props.description}
      required={props.required}
      error={props.error}
      {...props}
    >
      <Box
        my={8}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          border: `1px solid ${
            props.error ? theme.colors.red[5] : theme.colors.gray[4]
          }`,
          position: "relative",
        }}
      >
        <LanguageIndicator
          compact
          language={language}
          sx={{ position: "absolute", right: 3, top: 3, zIndex: 1 }}
        />
        <ReactCodeMirror
          {...extensions}
          onChange={props.onChange}
          value={value}
          basicSetup={basicSetup}
          theme={editorTheme}
        />
      </Box>
    </Input.Wrapper>
  );
};

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
