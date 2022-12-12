import defaultUser from "../../data/users.json";
import * as ls from "../../utils/localStorage";

import loginSlice, { logout, postLogin } from "./loginSlice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Inicializar el estado
const initialState = {
  auth: false,
  loading: false,
  error: "",
};

describe("Inicio de sesión", () => {
  ls.write("users", defaultUser);

  it("login con credenciales invalidas", async () => {
    const store = mockStore({});
    const actions = await store.dispatch(
      postLogin({ username: "admin", password: "invalid" })
    );
    expect(actions.type).toEqual("login/tryAuth/rejected");
  });

  it("login con credenciales correctas", async () => {
    const store = mockStore({});
    const actions = await store.dispatch(
      postLogin({ username: "admin", password: "admin" })
    );
    expect(actions.type).toEqual("login/tryAuth/fulfilled");
  });

  it("logout", () => {
    const state = initialState;
    const newState = loginSlice(state, logout());
    expect(newState.auth).toBe(false);
  });
});
