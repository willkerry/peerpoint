import { NativeSelect, Table, type NativeSelectProps } from "@mantine/core";
import { QuestionIcon } from "@primer/octicons-react";
import { useState } from "react";
import { usefulLanguages } from "../@types/Language";
import InfoModal from "./info-modal";

const defaultProps = {
  data: usefulLanguages.map((l) => ({
    label: l.name,
    value: String(l.id),
  })),
};

const LanguageSelect = (props: NativeSelectProps) => {
  const [open, setOpen] = useState(false);
  const label = (
    <>
      <span>{props.label}</span>
      <InfoModal
        title="Supported languages"
        isOpen={open}
        setClosed={() => setOpen(false)}
        setOpen={() => setOpen(true)}
        icon={<QuestionIcon />}
        inline
      >
        <LanguageInfo />
      </InfoModal>
    </>
  );
  return <NativeSelect {...props} label={label} />;
};

LanguageSelect.defaultProps = defaultProps;
export default LanguageSelect;

export const LanguageInfo = () => {
  const rows = usefulLanguages.map((l) => (
    <tr key={l.id}>
      <td>{l.name}</td>
      <td>{l.compiler}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Compiler/Runtime</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
