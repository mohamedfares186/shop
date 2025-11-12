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
import { registerUser } from "../setup/register.ts";

const agent = request.agent(app);

beforeAll(async () => {
  await setupTestDatabase();
  await initializeRoles();
});

beforeEach(async () => {
  await registerUser();
});

afterAll(async () => {
  await clearDatabase();
});

it("Log user in", async () => {
  const res = await agent.post("/api/v1/auth/login").send({
    username: "user",
    password: "Ex@123456",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe("Logged in successfully");
});
