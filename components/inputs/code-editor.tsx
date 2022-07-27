import { Input, InputWrapperProps, Skeleton } from "@mantine/core";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import dynamic from "next/dynamic";
import { Language, usefulLanguages } from "../../@types/Language";

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

const CodeEditor = (props: Props) => (
  <Input.Wrapper
    label={props.label}
    description={props.description}
    required={props.required}
  >
    <ReactCodeMirror
      {...props}
      extensions={[
        loadLanguage(
          usefulLanguages.find((l) => l.id === props.language)?.cm || "c"
        ),
      ]}
    />
  </Input.Wrapper>
);

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
