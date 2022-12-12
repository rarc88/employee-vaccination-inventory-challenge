import { User } from "../../interfaces";
import { Role } from "../../enums";
import * as ls from "../../utils/localStorage";
import { LoginData } from "./Login";

export const tryAuth = (loginData: LoginData) => {
  const users = ls.read("users") as User[];
  return new Promise<{ user: User }>((resolve, rejected) =>
    setTimeout(() => {
      const result = users.find(
        (user) =>
          user.username === loginData.username &&
          user.password === loginData.password
      );
      if (result) {
        const { password, ...user } = result;
        resolve({
          user: { ...user, role: user.role as Role },
        });
      } else rejected("Usuario y/o contraseña invalidos");
    }, 500)
  );
};
