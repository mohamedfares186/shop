import type { UUIDTypes } from "uuid";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  userId?: UUIDTypes;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
}

export type { LoginCredentials, RegisterCredentials };
