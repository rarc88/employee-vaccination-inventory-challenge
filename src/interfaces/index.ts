import { Role, VaccinationStatus, VaccineType } from "../enums";

export interface User {
  id?: string;
  username: string;
  password?: string;
  role: Role;
  identificationCard?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
  address?: string;
  phone?: string;
  vaccinationStatus?: VaccinationStatus;
  vaccineType?: VaccineType;
  vaccinationDate?: string;
  numberOfdoses?: number;
}
