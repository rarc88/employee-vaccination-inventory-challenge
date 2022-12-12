import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../interfaces";
import {
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  saveEmployee,
} from "./employeeAPI";
import { Filter } from "./EmployeeTableFilters";

export interface EmployeeState {
  loading: boolean;
  error?: string;
  user?: User;
  users: User[];
}

const initialState: EmployeeState = {
  loading: false,
  error: "",
  users: [],
};

export const postEmployee = createAsyncThunk(
  "employee/saveEmployee",
  async (user: User) => {
    const response = await saveEmployee(user);
    return response;
  }
);

export const getEmployee = createAsyncThunk(
  "employee/getEmployeeById",
  async (id: string) => {
    const response = await getEmployeeById(id);
    return response;
  }
);

export const getEmployees = createAsyncThunk(
  "employee/getAllEmployees",
  async (filter?: Filter) => {
    const response = await getAllEmployees(filter);
    return response;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployeeById",
  async (id: string) => {
    const response = await deleteEmployeeById(id);
    return response;
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(postEmployee.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });

    builder
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(getEmployee.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });

    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload.users;
      })
      .addCase(getEmployees.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });

    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.users = action.payload.users;
      })
      .addCase(deleteEmployee.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { reset } = employeeSlice.actions;

export const loading = (state: RootState) => state.employee.loading;
export const error = (state: RootState) => state.employee.error;
export const user = (state: RootState) => state.employee.user;
export const users = (state: RootState) => state.employee.users;

export default employeeSlice.reducer;
