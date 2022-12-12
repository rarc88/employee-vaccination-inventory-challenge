import { Formik, FormikHelpers } from "formik";
import React, { Fragment, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { Role, VaccinationStatus, VaccineType } from "../../enums";
import { User } from "../../interfaces";
import {
  email,
  length,
  minLength,
  onlyLetters,
  onlyNumbers,
  required,
} from "../../utils/validator";
import { user as userLogged } from "../login/loginSlice";
import {
  getEmployee,
  loading,
  postEmployee,
  reset,
  user,
} from "./employeeSlice";
import { toast, ToastContainer } from "react-toastify";

const initialValues: User = {
  id: undefined,
  username: "",
  password: "",
  role: Role.EMPLEADO,
  identificationCard: "",
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  address: "",
  phone: "",
  vaccinationStatus: undefined,
  vaccineType: undefined,
  vaccinationDate: "",
  numberOfdoses: 0,
};

export const EmployeeForm = () => {
  const isLoading = useAppSelector(loading);
  const userData = useAppSelector(user);
  const uLogged = useAppSelector(userLogged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      if (id === "new") dispatch(reset(initialValues));
      else dispatch(getEmployee(id));
    } else {
      if (uLogged && uLogged.id) dispatch(getEmployee(uLogged.id));
    }
  }, [id, uLogged, dispatch]);

  const validate = (values: User) => {
    const errors: any = {};

    let result;
    if (
      (result =
        required(values.identificationCard) ||
        onlyNumbers(values.identificationCard) ||
        length(values.identificationCard, 10))
    )
      errors.identificationCard = result;

    if (
      (result =
        required(values.firstName) ||
        onlyLetters(values.firstName) ||
        minLength(values.firstName, 2))
    )
      errors.firstName = result;

    if (
      (result =
        required(values.lastName) ||
        onlyLetters(values.lastName) ||
        minLength(values.lastName, 2))
    )
      errors.lastName = result;

    if ((result = required(values.email) || email(values.email)))
      errors.email = result;

    if (values.id && values.id !== "new") {
      if ((result = required(values.username) || minLength(values.username, 5)))
        errors.username = result;

      if ((result = required(values.password) || minLength(values.password, 5)))
        errors.password = result;

      if (uLogged?.role === Role.EMPLEADO) {
        if (
          values.phone &&
          (result = onlyNumbers(values.phone) || minLength(values.phone, 7))
        )
          errors.phone = result;

        if (values.vaccinationStatus === VaccinationStatus.VACUNADO) {
          if ((result = required(values.vaccineType)))
            errors.vaccineType = result;

          if ((result = required(values.vaccinationDate)))
            errors.vaccinationDate = result;

          if (Number(values.numberOfdoses ?? 0) < 1)
            errors.numberOfdoses = "Campo obligatorio";
        }
      }
    }

    return errors;
  };

  const onSubmit = async (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    const result = await dispatch(postEmployee(values));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Guardado con éxito", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (result.meta.requestStatus === "rejected") {
      const { error } = result as any;
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSubmitting(false);
  };

  return (
    <Container>
      <ToastContainer />
      <h3 className="text-center h3 display-6">Información del empleado</h3>
      <Formik
        initialValues={userData ?? initialValues}
        validate={validate}
        onSubmit={onSubmit}
        enableReinitialize={true}
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
              <Row>
                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="identificationCard"
                    label="Cédula"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.identificationCard}
                    error={errors.identificationCard}
                    touched={touched.identificationCard}
                  />
                </Col>

                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="firstName"
                    label="Nombres"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.firstName}
                    error={errors.firstName}
                    touched={touched.firstName}
                  />
                </Col>

                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="lastName"
                    label="Apellidos"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.lastName}
                    error={errors.lastName}
                    touched={touched.lastName}
                  />
                </Col>

                <Col md={6}>
                  <CustomInput
                    type="text"
                    name="email"
                    label="Correo electrónico"
                    isSubmitting={!isLoading}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                  />
                </Col>

                {values.id && values.id !== "new" ? (
                  <Fragment>
                    <Col md={6}>
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
                    </Col>

                    <Col md={6}>
                      <CustomInput
                        type="text"
                        name="password"
                        label="Contraseña"
                        isSubmitting={!isLoading}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                      />
                    </Col>

                    <Fragment>
                      <Col md={6}>
                        <CustomInput
                          type="date"
                          name="birthday"
                          label="Fecha de nacimiento"
                          isSubmitting={!isLoading}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          value={values.birthday}
                          error={errors.birthday}
                          touched={touched.birthday}
                        />
                      </Col>

                      <Col md={6}>
                        <CustomInput
                          type="textarea"
                          name="address"
                          label="Dirección de domicilio"
                          isSubmitting={!isLoading}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          value={values.address}
                          error={errors.address}
                          touched={touched.address}
                        />
                      </Col>

                      <Col md={6}>
                        <CustomInput
                          type="text"
                          name="phone"
                          label="Teléfono móvil"
                          isSubmitting={!isLoading}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          value={values.phone}
                          error={errors.phone}
                          touched={touched.phone}
                        />
                      </Col>

                      <Col md={6}>
                        <CustomInput
                          type="select"
                          name="vaccinationStatus"
                          label="Estado de vacunación"
                          isSubmitting={!isLoading}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          value={values.vaccinationStatus}
                          error={errors.vaccinationStatus}
                          touched={touched.vaccinationStatus}
                          options={Object.values(VaccinationStatus)}
                        />
                      </Col>

                      {values.vaccinationStatus &&
                      values.vaccinationStatus ===
                        VaccinationStatus.VACUNADO ? (
                        <Fragment>
                          <Col md={6}>
                            <CustomInput
                              type="select"
                              name="vaccineType"
                              label="Tipo de vacuna"
                              isSubmitting={!isLoading}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              value={values.vaccineType}
                              error={errors.vaccineType}
                              touched={touched.vaccineType}
                              options={Object.values(VaccineType)}
                            />
                          </Col>

                          <Col md={6}>
                            <CustomInput
                              type="date"
                              name="vaccinationDate"
                              label="Fecha de vacunación"
                              isSubmitting={!isLoading}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              value={values.vaccinationDate}
                              error={errors.vaccinationDate}
                              touched={touched.vaccinationDate}
                            />
                          </Col>

                          <Col md={6}>
                            <CustomInput
                              type="number"
                              name="numberOfdoses"
                              label="Número de dosis"
                              isSubmitting={!isLoading}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              value={values.numberOfdoses}
                              error={errors.numberOfdoses}
                              touched={touched.numberOfdoses}
                            />
                          </Col>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  </Fragment>
                ) : (
                  ""
                )}
              </Row>
              <Row>
                <Col className="d-flex justify-content-end justify-items-center py-2">
                  <Button
                    variant="warning"
                    disabled={isLoading}
                    className="mx-2"
                    onClick={() => navigate(-1)}
                  >
                    Atrás
                  </Button>
                  <Button variant="primary" type="submit" disabled={isLoading}>
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
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Fragment>
        )}
      </Formik>
    </Container>
  );
};
