import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  type: string;
  name: string;
  label: string;
  isSubmitting: boolean;
  handleChange: any;
  handleBlur: any;
  value: any;
  error?: string;
  touched?: boolean;
  options?: any[];
}

export const CustomInput = ({
  type,
  name,
  label,
  isSubmitting,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  options,
}: Props) => {
  const getControl = () => {
    switch (type) {
      case "textarea":
        return (
          <Form.Control
            type={type}
            name={name}
            placeholder={label}
            disabled={!isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            as="textarea"
            rows={3}
          />
        );
      case "select":
        return (
          <Form.Select
            name={name}
            disabled={!isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
          >
            <option>Seleccione una opción</option>
            {options?.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </Form.Select>
        );
      default:
        return (
          <Form.Control
            type={type}
            name={name}
            placeholder={label}
            disabled={!isSubmitting}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
          />
        );
    }
  };

  return (
    <Form.Group className="mb-3" id="identificationCard">
      <Form.Label>{label}</Form.Label>
      {getControl()}
      <Form.Text className="text-danger">
        {type === "select" && error && error.length > 0 ? error : ""}
        {type !== "select" && error && touched ? error : ""}
      </Form.Text>
    </Form.Group>
  );
};
