import request from "supertest";
import app from "../../../app";
import connectDB from "../../../dataBase/connectionDB";

describe("registerRoute", () => {
  beforeAll(async () => {
    await connectDB.initialize();
  });

  afterAll(async () => {
    await connectDB.destroy();
  });

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
