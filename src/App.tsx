import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Layout } from "./components/layout/Layout";
import { Role } from "./enums";
import { EmployeeForm } from "./features/employee/EmployeeForm";
import { Employee } from "./features/employee/Employee";
import { Home } from "./features/home/Home";
import { Login } from "./features/login/Login";
import { auth, user } from "./features/login/loginSlice";

function App() {
  const isAuth = useAppSelector(auth);
  const userData = useAppSelector(user);

  return (
    <BrowserRouter>
      {(() => {
        /**
         * Control de acceso a la aplicación
         * Se renderizan las rutas según el rol
         * del usuario logeado
         */
        if (isAuth) {
          return (
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                {userData?.role === Role.ADMINISTRADOR ? (
                  <Fragment>
                    <Route path="/employees" element={<Employee />} />
                    <Route path="/employees/:id" element={<EmployeeForm />} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Route path="/information" element={<EmployeeForm />} />
                  </Fragment>
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          );
        } else {
          return (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          );
        }
      })()}
    </BrowserRouter>
  );
}

export default App;
