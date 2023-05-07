import request from "supertest";
import app from "../../../app";

describe("registerRoute", () => {
  test("should return 200 and the response from AuthService.register", async () => {
    const requestBody = {
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    };

    const response = await request(app).post("/api/register").send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toBe("User created successfully");
  });
});
