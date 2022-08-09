import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { Box, Input, InputWrapperProps, useMantineTheme } from "@mantine/core";
import { createTheme } from "@uiw/codemirror-themes";
import React, { ForwardRefExoticComponent, useEffect, useState } from "react";

import { Language, languageMap } from "../../types/Language";
import LanguageIndicator from "../display/language-indicator";

import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
type Props = ReactCodeMirrorProps &
  InputWrapperProps & {
    children?: React.ReactNode;
    language?: Language["id"];
  };

const defaultProps = {
  children: null,
};

const CodeEditor = ({
  language,
  value,
  basicSetup,
  editable,
  onChange,
  ...props
}: Props) => {
  const theme = useMantineTheme();

  const [comp, setComp] =
    useState<ForwardRefExoticComponent<ReactCodeMirrorProps>>();
  const [lang, setLang] = useState<StreamLanguage<unknown> | LanguageSupport>();
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

  const l = languageMap.get(language)?.cm;

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

  const CodeMirrorThemeExtension: Extension = EditorView.theme({
    "&": { fontSize: `${theme.fontSizes.sm}px` },
    ".cm-content": { fontFamily: theme.fontFamilyMonospace, fontWeight: 450 },
  });

  const extensions = lang
    ? [lang, CodeMirrorThemeExtension]
    : [CodeMirrorThemeExtension];

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
    <Input.Wrapper {...props}>
      <Box sx={{ position: "relative" }}>
        <Box
          my={8}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            border: `1px solid ${
              props.error ? theme.colors.red[5] : theme.colors.gray[4]
            }`,
          }}
        >
          {Comps && (
            <Comps
              {...{
                editable,
                basicSetup,
                value,
                onChange,
                theme: editorTheme,
                extensions: extensions,
                autocomplete: false,
                spellCheck: false,
              }}
            />
          )}
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
        </Box>
      </Box>
    </Input.Wrapper>
  );
};

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
