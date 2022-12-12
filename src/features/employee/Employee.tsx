import React, { Fragment } from "react";
import "./Employee.css";
import { Container, Spinner, Table } from "react-bootstrap";
import { FaEye, FaTrash, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteEmployee, loading, users } from "./employeeSlice";
import Swal from "sweetalert2";
import { EmployeeTableFilters } from "./EmployeeTableFilters";

export const Employee = () => {
  const isLoading = useAppSelector(loading);
  const userData = useAppSelector(users);
  const dispatch = useAppDispatch();

  const size = 20;

  const handleDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "¿Confirma que desea eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  return (
    <Container className="employee">
      <div className="d-flex justify-content-end justify-items-center py-2">
        <Link to={`/employees/new`}>
          <strong>Registrar</strong> <FaPlusSquare size={size} color="green" />
        </Link>
      </div>

      <EmployeeTableFilters isLoading={isLoading} />

      <Table striped bordered hover size="sm" className="shadow">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>Usuario</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo electrónico.</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center" colSpan={7}>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="m-2"
                />
              </td>
            </tr>
          ) : (
            <Fragment />
          )}
          {!isLoading && (!userData || userData.length === 0) ? (
            <tr>
              <td className="text-center" colSpan={7}>
                <p>Sin datos para mostrar</p>
              </td>
            </tr>
          ) : (
            <Fragment />
          )}
          {!isLoading && userData && userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.identificationCard}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <Link to={`/employees/${user.id}`}>
                    <FaEye size={size} color="dodgerblue" />
                  </Link>
                  <a
                    href="/"
                    className="px-2"
                    onClick={(e) => handleDelete(e, user.id!)}
                  >
                    <FaTrash size={size} color="red" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <Fragment />
          )}
        </tbody>
      </Table>
    </Container>
  );
};
