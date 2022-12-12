import { Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { VaccinationStatus, VaccineType } from "../../enums";
import { getEmployees } from "./employeeSlice";

interface Props {
  isLoading: boolean;
}

export interface Filter {
  vaccinationStatus?: VaccinationStatus | "";
  vaccineType?: VaccineType | "";
  dateFrom?: string;
  dateTo?: string;
}

let initialValues: Filter = {
  vaccinationStatus: "",
  vaccineType: "",
  dateFrom: "",
  dateTo: "",
};

export const EmployeeTableFilters = ({ isLoading }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  useEffect(() => {
    if (params && params.vaccinationStatus) initialValues = params;
    dispatch(getEmployees(params));
    // eslint-disable-next-line
  }, []);

  const validate = (values: Filter) => {
    const errors: any = {};

    if (values.dateFrom && values.dateTo && values.dateFrom > values.dateTo) {
      errors.dateFrom = "Rango de fecha inválido";
      errors.dateTo = "Rango de fecha inválido";
    }

    return errors;
  };

  const onSubmit = async (
    values: Filter,
    { setSubmitting }: FormikHelpers<Filter>
  ) => {
    if (hasFilters(values)) {
      params["vaccinationStatus"] = values.vaccinationStatus ?? "";
      params["vaccineType"] = values.vaccineType ?? "";
      params["dateFrom"] = values.dateFrom ?? "";
      params["dateTo"] = values.dateTo ?? "";
      setSearchParams(params);

      dispatch(getEmployees(values));
    }
    setSubmitting(false);
  };

  const onReset = async (values: Filter, resetForm?: any, setValues?: any) => {
    if (hasFilters(values)) {
      params["vaccinationStatus"] = "";
      params["vaccineType"] = "";
      params["dateFrom"] = "";
      params["dateTo"] = "";
      setSearchParams(params);

      resetForm();
      setValues(params);

      dispatch(getEmployees(params));
    }
  };

  const hasFilters = (values: Filter) => {
    return (
      (values.vaccinationStatus ?? "").length > 0 ||
      (values.vaccineType ?? "").length > 0 ||
      (values.dateFrom ?? "").length > 0 ||
      (values.dateTo ?? "").length > 0
    );
  };

  return (
    <Formik
      initialValues={initialValues}
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
        resetForm,
        setValues,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
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

            <Col md={3}>
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

            <Col md={3}>
              <CustomInput
                type="date"
                name="dateFrom"
                label="Fecha desde"
                isSubmitting={!isLoading}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.dateFrom}
                error={errors.dateFrom}
                touched={touched.dateFrom}
              />
            </Col>

            <Col md={3}>
              <CustomInput
                type="date"
                name="dateTo"
                label="Fecha hasta"
                isSubmitting={!isLoading}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.dateTo}
                error={errors.dateTo}
                touched={touched.dateTo}
              />
            </Col>

            <Col className="d-flex justify-content-end mb-3">
              <Button
                variant="warning"
                disabled={isLoading}
                className="mx-2"
                onClick={() => onReset(values, resetForm, setValues)}
              >
                Limpiar
              </Button>

              <Button variant="primary" type="submit" disabled={isLoading}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
