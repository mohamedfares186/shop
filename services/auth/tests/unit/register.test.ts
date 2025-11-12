import { it } from "@jest/globals";
import request from "supertest";

let mockUuidCounter = 0;
jest.mock("uuid", () => ({
  v4: jest.fn(() => `mock-uuid-${mockUuidCounter++}`),
}));

jest.setTimeout(10000);

import app from "../../src/app.ts";
import {
  setupTestDatabase,
  clearDatabase,
  initializeRoles,
} from "../setup/database.ts";

const agent = request.agent(app);

beforeAll(async () => {
  await setupTestDatabase();
  await initializeRoles();
});

afterAll(async () => {
  await clearDatabase();
});

it("Testing registering a new user", async () => {
  const res = await agent.post("/api/v1/auth/register").send({
    firstName: "example",
    lastName: "example",
    email: "example@example.com",
    username: "example",
    password: "Ex@123456",
    repeatPassword: "Ex@123456",
    dateOfBirth: "2000-01-01",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe(
    "Registration successful. Please check your email to verify your account."
  );
});
