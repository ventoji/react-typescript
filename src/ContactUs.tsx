import * as React from "react";
import {
  Form,
  ISubmitResult,
  IValues,
  minLength,
  required,
  belongTo
} from "./Form";

interface IProps {
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

export const ContactUs: React.FC<IProps> = (props) => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const result = await props.onSubmit(values);
    return result;
  };
  return (
    <Form
      defaultValues={{
        name: "",
        email: "",
        neditor: 0,
        reason: "Support",
        notes: ""
      }}
      validationRules={{
        email: { validator: required },
        neditor: { validator: belongTo },
        name: [{ validator: required }, { validator: minLength, arg: 2 }]
      }}
      onSubmit={handleSubmit}
    >
      <Form.Field name="name" label="Your name" />
      <Form.Field name="neditor" label="Urgency" type="Number" />
      <Form.Field name="email" label="Your email address" type="Email" />
      <Form.Field
        name="reason"
        label="Reason you need to contact us"
        type="Select"
        options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
      />
      <Form.Field name="notes" label="Additional notes" type="TextArea" />
    </Form>
  );
};
