import { InputWrapper, Skeleton, type InputWrapperProps } from "@mantine/core";
import { type ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";
import dynamic from "next/dynamic";

const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <Skeleton height={30} radius="md" />,
});

type Props = ReactCodeMirrorProps &
  InputWrapperProps & {
    children?: React.ReactNode;
    language?: LanguageName;
  };

const defaultProps = {
  children: null,
};

const CodeEditor = (props: Props) => (
  <InputWrapper
    label={props.label}
    description={props.description}
    required={props.required}
  >
    <ReactCodeMirror
      {...props}
      extensions={[loadLanguage(props.language || "c")]}
    />
  </InputWrapper>
);

CodeEditor.defaultProps = defaultProps;
export default CodeEditor;
