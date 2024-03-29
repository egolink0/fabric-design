import { Form, Switch } from "antd";
import { useEffect } from "react";

const { Item: FormItem } = Form;

export default function TextPattern(props) {
  const [form] = Form.useForm();
  const { value, onChange } = props;

  const handleChange = (v) => {
    onChange &&
      onChange({
        ...value,
        ...v,
      });
  };

  useEffect(() => {
    if (value) {
      form.setFieldsValue(value);
    }
  }, [value]);

  return (
    <Form form={form} onValuesChange={handleChange} colon={false}>
      <FormItem
        label={
          <span style={{ fontSize: 15, fontWeight: "bold" }}>Image fill</span>
        }
      />
      <FormItem label="Enable" name="enable" valuePropName="checked">
        <Switch />
      </FormItem>
    </Form>
  );
}
