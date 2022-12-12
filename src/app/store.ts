import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import employeeReducer from "../features/employee/employeeSlice";
import * as ls from "../utils/localStorage";
import defaultUser from "../data/users.json";

/**
 * Cargar los datos iniciales desde el JSON
 * y lo combina al estado de la aplicacion
 * Si el estado ha sido almacenado en el localStorage
 * se cargara como estado inicial
 * @returns
 */
const initialState = () => {
  const users = ls.read("users");
  if (!users) {
    ls.write("users", defaultUser);
  }

  const state = ls.read("state");
  if (state === null) return undefined;
  return state;
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    employee: employeeReducer,
  },
  preloadedState: initialState(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * Almacena los cambios del estado del login
 * en el localStorage
 */
store.subscribe(() => {
  const state = store.getState();
  ls.write("state", { login: state.login });
});
