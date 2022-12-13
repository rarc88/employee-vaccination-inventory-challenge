import React, { Fragment } from "react";
import "./Login.css";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loading, postLogin } from "./loginSlice";
import { Formik, FormikHelpers } from "formik";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { minLength, required } from "../../utils/validator";
import { toast, ToastContainer } from "react-toastify";

export interface LoginData {
  username: string;
  password: string;
}

const initialValues: LoginData = {
  username: "",
  password: "",
};

export const Login = () => {
  const isLoading = useAppSelector(loading);
  const dispatch = useAppDispatch();

  const validate = (values: LoginData) => {
    const errors: any = {};

    let result;
    if ((result = required(values.username) || minLength(values.username, 5)))
      errors.username = result;

    if ((result = required(values.password) || minLength(values.password, 5)))
      errors.password = result;

    return errors;
  };

  const onSubmit = async (
    values: LoginData,
    { setSubmitting }: FormikHelpers<LoginData>
  ) => {
    const result = await dispatch(postLogin(values));
    if (result.meta.requestStatus === "rejected") {
      const { error } = result as any;
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSubmitting(false);
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Row className="vh-100">
        <Col md={7} className="bg"></Col>
        <Col
          md={5}
          className="d-flex flex-column justify-content-center px-4 bg-color"
        >
          <h3 className="text-center h3 display-6">Inicio de sesión</h3>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Fragment>
                <Form onSubmit={handleSubmit}>
                  <CustomInput
                    type="text"
                    name="username"
                    label="Usuario"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.username}
                    error={errors.username}
                    touched={touched.username}
                  />

                  <CustomInput
                    type="password"
                    name="password"
                    label="Contraseña"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      <Fragment />
                    )}{" "}
                    Ingresar
                  </Button>
                </Form>
              </Fragment>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
