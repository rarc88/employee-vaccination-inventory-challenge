import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Role } from "../../enums";
import { logout, user } from "../../features/login/loginSlice";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  const userLogged = useAppSelector(user);
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState(0);
  const nav = useRef<HTMLDivElement>(null);

  const handlerResize = () => {
    if (nav.current) setHeight(nav.current.clientHeight);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" fixed="top" ref={nav}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Home
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="me-auto w-100">
              {userLogged && userLogged.role === Role.ADMINISTRADOR ? (
                <Nav.Link as={Link} to="/employees">
                  Empleados
                </Nav.Link>
              ) : (
                ""
              )}
              {userLogged && userLogged.role === Role.EMPLEADO ? (
                <Nav.Link as={Link} to="/information">
                  Información
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            <Nav className="me-auto">
              <Nav.Link className="d-flex" onClick={handleLogout}>
                Salir
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: height }} className="pt-4">
        {children}
      </Container>
    </Fragment>
  );
};
