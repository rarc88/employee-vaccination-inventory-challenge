import { v4 } from "uuid";
import { Role } from "../../enums";
import { User } from "../../interfaces";
import * as ls from "../../utils/localStorage";
import { Filter } from "./EmployeeTableFilters";

export const saveEmployee = (userData: User) => {
  let users = ls.read("users") as User[];
  return new Promise<{ user: User }>((resolve, rejected) =>
    setTimeout(() => {
      try {
        let result = users.find(
          (user) =>
            user.identificationCard?.trim() ===
              userData.identificationCard?.trim() && user.id !== userData.id
        );
        if (result) throw new Error("Cédula duplicada");

        result = users.find(
          (user) =>
            user.email?.trim().toUpperCase() ===
              userData.email?.trim().toUpperCase() && user.id !== userData.id
        );
        if (result) throw new Error("Correo electrónico duplicado");

        if (userData.id) {
          users = users.map((user) =>
            user.id === userData.id ? userData : user
          );
        } else {
          userData.id = userData.id ?? v4();
          userData.username =
            userData.username && userData.username.length > 0
              ? userData.username
              : generateRandomUsername(4, 2);
          userData.password =
            userData.password && userData.password.length > 0
              ? userData.password
              : generateRandomPassword(6);

          users.push(userData);
        }

        ls.write("users", users);

        resolve({ user: userData });
      } catch (error) {
        rejected(error);
      }
    }, 500)
  );
};

export const getEmployeeById = (id: string) => {
  const users = ls.read("users") as User[];
  return new Promise<{ user: User }>((resolve, rejected) =>
    setTimeout(() => {
      try {
        let user = users.find((user) => user.id === id);
        if (!user) throw new Error(`Empleado con ID [${id}] no encontrado`);

        resolve({ user: user });
      } catch (error) {
        rejected(error);
      }
    }, 500)
  );
};

export const getAllEmployees = (filter?: Filter) => {
  let users = ls.read("users") as User[];
  return new Promise<{ users: User[] }>((resolve, rejected) =>
    setTimeout(() => {
      try {
        users = users.filter(
          (user) =>
            user.role !== Role.ADMINISTRADOR &&
            ((filter?.vaccinationStatus ?? "").length > 0
              ? user.vaccinationStatus === filter?.vaccinationStatus
              : true) &&
            ((filter?.vaccineType ?? "").length > 0
              ? user.vaccineType === filter?.vaccineType
              : true) &&
            ((filter?.dateFrom ?? "").length > 0 &&
            (user.vaccinationDate ?? "").length > 0
              ? user.vaccinationDate! >= filter?.dateFrom!
              : true) &&
            ((filter?.dateTo ?? "").length > 0 &&
            (user.vaccinationDate ?? "").length > 0
              ? user.vaccinationDate! <= filter?.dateTo!
              : true)
        );
        resolve({
          users: users,
        });
      } catch (error) {
        rejected(error);
      }
    }, 500)
  );
};

export const deleteEmployeeById = (id: string) => {
  let users = ls.read("users") as User[];
  return new Promise<{ users: User[] }>((resolve, rejected) =>
    setTimeout(() => {
      try {
        users = users.filter((user) => user.id !== id);
        ls.write("users", users);
        users = users.filter((user) => user.role !== Role.ADMINISTRADOR);
        resolve({ users: users });
      } catch (error) {
        rejected(error);
      }
    }, 500)
  );
};

const generateRandomPassword = (length: number) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const generateRandomUsername = (maxLetters: number, maxNumbers: number) => {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  let username = "";
  for (let i = 0, n = charset.length; i < maxLetters; ++i) {
    username += charset.charAt(Math.floor(Math.random() * n));
  }

  charset = "0123456789";
  username += "_";
  for (let i = 0, n = charset.length; i < maxNumbers; ++i) {
    username += charset.charAt(Math.floor(Math.random() * n));
  }

  return username;
};
