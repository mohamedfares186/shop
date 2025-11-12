import request from "supertest";
import app from "../../src/app";

const agent = request.agent(app);

export const loginUser = async () => {
  return await agent.post("/api/v1/auth/login").send({
    username: "user",
    password: "Ex@123456",
  });
};
