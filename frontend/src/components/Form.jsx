import {
  Checkbox,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import CustomButton from "../components/CustomButton.jsx";

function DynamicForm({ fields, onSubmit }) {
  const form = useForm({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {}),
  });

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            {...form.getInputProps(field.name)}
          />
        );
      case "password":
        return (
          <PasswordInput
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            {...form.getInputProps(field.name)}
          />
        );
      case "number":
        return (
          <NumberInput
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            {...form.getInputProps(field.name)}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            {...form.getInputProps(field.name, { type: "checkbox" })}
          />
        );
      case "select":
        return (
          <Select
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            data={field.options || []}
            {...form.getInputProps(field.name)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      {fields.map((field) => renderField(field))}
      <Group position="right" mt="md">
        <CustomButton label="Submit" />
      </Group>
    </form>
  );
}

export default DynamicForm;
