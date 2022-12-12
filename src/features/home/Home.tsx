import React from "react";
import { Card, Container } from "react-bootstrap";

export const Home = () => {
  return (
    <Container>
      <Card border="dark" className="shadow ">
        <Card.Header>¡Bienvenido!</Card.Header>
        <Card.Body>
          <Card.Title>
            Aplicación de inventario de vacunación de empleados
          </Card.Title>
          <Card.Text>
            Este sistema ha sido desarrollado haciendo uso de las siguientes
            tecnologías:
          </Card.Text>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Redux</li>
            <li>React Router DOM</li>
            <li>Bootstrap</li>
            <li>Datos por defecto en JSON</li>
            <li>Almacenamiento temporal en el LocalStorage</li>
          </ul>
          <p className="lead">
            <strong>Nota:</strong> En el formulario de registro que uso un input
            de tipo texto para la contraseña (sin encriptación) solo para
            facilitar la obtención de esta en el reto.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};
