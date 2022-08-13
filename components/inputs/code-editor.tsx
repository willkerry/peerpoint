import React, { useEffect, useState } from "react";
import type { ForwardRefExoticComponent } from "react";

import { Box, Input, InputWrapperProps, useMantineTheme } from "@mantine/core";

import type { LanguageSupport, StreamLanguage } from "@codemirror/language";
import type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import type {
  BasicSetupOptions,
  ReactCodeMirrorProps,
} from "@uiw/react-codemirror";

import { Language, languageMap } from "../../types/Language";
import LanguageIndicator from "../display/language-indicator";

type Props = ReactCodeMirrorProps &
  Omit<InputWrapperProps, "children"> & {
    language?: Language["id"];
    fullWidth?: boolean;
  };

const defaultProps = {
  children: null,
};

const CodeEditor: React.FC<Props> = ({
  language,
  value,
  basicSetup,
  editable,
  onChange,
  fullWidth,
  ...props
}) => {
  const theme = useMantineTheme();

  // Initialise an empty useState value for the CodeMirror editor
  const [comp, setComp] =
    useState<ForwardRefExoticComponent<ReactCodeMirrorProps>>();

  // Initialise useState value for the language support package
  const [lang, setLang] = useState<StreamLanguage<unknown> | LanguageSupport>();

  // Lookup the CodeMirror language code for the given language ID
  const l = languageMap.get(language)?.cm;

  // On mount, import React CodeMirror and assign it to the useState value
  useEffect(() => {
    if (window) {
      import("@uiw/react-codemirror").then((obj) => {
        if (!comp) {
          setComp(obj.default);
        }
      });
    }
  }, [comp, setComp]);
  const Comps = comp;

  // On mount, import the language support package and assign it to the useState value
  useEffect(() => {
    if (window) {
      import("@uiw/codemirror-extensions-langs").then((module) => {
        const { loadLanguage } = module;
        if (!lang) {
          setLang(loadLanguage(l));
        }
      });
    }
  }, [lang, setLang, l]);

  // Define a small extension for using theme typefaces
  const codeMirrorThemeExtension: Extension = EditorView.theme({
    "&": {
      fontSize: `${theme.fontSizes.sm}px`,
      padding: fullWidth
        ? `${theme.spacing.xs}px ${theme.spacing.xs}px 60px ${theme.spacing.xs}px`
        : `1px 3px`,
    },
    ".cm-content": { fontFamily: theme.fontFamilyMonospace, fontWeight: 450 },
  });

  // Include the theme in the extension array
  const extensions = lang
    ? [lang, codeMirrorThemeExtension]
    : [codeMirrorThemeExtension];

  // Add the BasicSetup props to the default setup
  const defaultBasicSetup: BasicSetupOptions = {
    lineNumbers: false,
    foldGutter: false,
    ...{ basicSetup },
  };

  // Define the syntax highlighting theme
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

  const editor = Comps && (
    <Comps
      {...{
        editable,
        basicSetup: defaultBasicSetup,
        value,
        onChange,
        theme: editorTheme,
        extensions: extensions,
        autoFocus: fullWidth,
        width: "100vw",
        minHeight: fullWidth ? "calc(100vh - 50px - 100px)" : null,
      }}
    />
  );
  const indicator = (
    <Box
      sx={{
        position: "absolute",
        right: 3,
        top: 3,
        zIndex: 1,
        backdropFilter: "blur(2px)",
        borderRadius: theme.radius.sm,
        padding: 4,
      }}
    >
      <LanguageIndicator compact {...{ language }} />
    </Box>
  );

  if (fullWidth)
    return (
      <Box sx={{ position: "relative", display: "flex" }}>
        {editor}
        {indicator}
      </Box>
    );

  return (
    <Input.Wrapper {...props}>
      <Box sx={{ position: "relative" }}>
        <Box
          my={8}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            border: `1px solid ${
              props.error ? theme.colors.red[5] : theme.colors.dark[4]
            }`,
          }}
        >
          {editor}
          {indicator}
        </Box>
      </Box>
    </Input.Wrapper>
  );
};

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
