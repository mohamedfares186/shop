import request from "supertest";
import app from "../../src/app";

const agent = request.agent(app);

export const registerUser = async () => {
  return await agent.post("/api/v1/auth/register").send({
    firstName: "user",
    lastName: "user",
    email: "user@example.com",
    username: "user",
    password: "Ex@123456",
    repeatPassword: "Ex@123456",
    dateOfBirth: "2000-01-01",
  });
};
