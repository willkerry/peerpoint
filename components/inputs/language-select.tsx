import { Select, Group, Text, Avatar, Badge } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CodeIcon } from "@primer/octicons-react";
import { forwardRef } from "react";
import { languageMap } from "../../@types/Language";
import { CreateFormValues } from "../../pages/create";

const defaultProps = {
  data: Array.from(languageMap.keys(), (k) => {
    const l = languageMap.get(k);
    return {
      value: k,
      label: l?.name,
      image: l?.image,
      color: l?.color,
      compiler: l?.compiler,
      cm: l?.cm,
    };
  }),
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  compiler: string;
  cm: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, compiler, image, cm, ...others }: ItemProps, ref) => (
    <Group ref={ref} {...others} noWrap position="apart">
      <Group noWrap>
        <Avatar src={image} size="sm">
          {label?.split("")[0]}
        </Avatar>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" sx={{ opacity: 0.6 }}>
            {compiler}
          </Text>
        </div>
      </Group>
      {!cm && <Badge color="gray">Basic editor</Badge>}
    </Group>
  )
);

SelectItem.displayName = "SelectItem";

const LanguageSelect = ({
  form,
}: {
  form: UseFormReturnType<CreateFormValues>;
}) => {
  return (
    <Select
      {...form.getInputProps("language")}
      {...defaultProps}
      required
      placeholder="Select a language"
      itemComponent={SelectItem}
      selectOnBlur
      searchable
      icon={<CodeIcon size={14} />}
      label="Language"
      filter={(value, item) =>
        item?.label?.toLowerCase().includes(value.toLowerCase()) ||
        item?.compiler?.toLowerCase().includes(value.toLowerCase()) ||
        item?.cm?.toLowerCase().includes(value.toLowerCase())
      }
    />
  );
};

LanguageSelect.defaultProps = defaultProps;

export default LanguageSelect;
