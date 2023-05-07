import request from "supertest";
import app from "../../../app";

describe("registerRoute", () => {
  it("should return 200 and the response from AuthService.register", async () => {
    const response = await request(app).post("/api/register").send({
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toBe("User created successfully");
  });
});
