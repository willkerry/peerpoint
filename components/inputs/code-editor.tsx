import {
  Box,
  Input,
  InputWrapperProps,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import dynamic from "next/dynamic";
import { Language, languageMap } from "../../@types/Language";
import LanguageIndicator from "../display/language-indicator";

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

const CodeEditor = (props: Props) => {
  const theme = useMantineTheme();
  const language = languageMap.get(props.language)?.cm;
  const extensions = {
    extensions: language ? [loadLanguage(language)] : [],
  };
  return (
    <Input.Wrapper
      label={props.label}
      description={props.description}
      required={props.required}
      error={props.error}
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
          language={props.language}
          sx={{ position: "absolute", right: 3, top: 3, zIndex: 1 }}
        />
        <ReactCodeMirror {...props} {...extensions} />
      </Box>
    </Input.Wrapper>
  );
};

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
