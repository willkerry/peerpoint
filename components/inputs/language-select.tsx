import { Select, SelectProps, Group, Text, Avatar } from "@mantine/core";
import { CodeIcon } from "@primer/octicons-react";
import { forwardRef } from "react";
import { usefulLanguages } from "../../@types/Language";

const defaultProps = {
  data: usefulLanguages.map((l) => ({
    value: String(l.id),
    label: l.name,
    ...l,
  })),
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  compiler: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, compiler, image, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} size="sm">
          {label.split("")[0]}
        </Avatar>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" sx={{ opacity: 0.6 }}>
            {compiler}
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = "SelectItem";

const LanguageSelect = (props: SelectProps) => {
  return (
    <Select
      {...props}
      placeholder="Select a language"
      itemComponent={SelectItem}
      searchable
      icon={<CodeIcon size={14} />}
      label={props.label}
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
