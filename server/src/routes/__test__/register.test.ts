import request from "supertest";
import registerRoute from "../register";
import app from "../../app";

const authService = {
  register: jest.fn(),
};

describe("registerRoute", () => {
  it("should return 200 and the response from AuthService.register", async () => {
    const requestBody = {
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    };

    await request(app).post("/api/register").send(requestBody).expect(200);
  });

  //   it("should return an error if AuthService.register throws an error", async () => {
  //     const requestBody = {
  //       user_name: "test",
  //       email: "testemail",
  //       password: "testpassword",
  //     };

  //     const authService = Container.get(AuthService);
  //     const errorMessage = "Something went wrong";
  //     jest
  //       .spyOn(authService, "register")
  //       .mockRejectedValueOnce(new Error(errorMessage));

  //     const res: Partial<Response> = {
  //       json: jest.fn().mockReturnValueOnce({ message: errorMessage }),
  //       status: jest.fn().mockReturnValueOnce({}),
  //     };
  //     const req: Partial<Request> = { body: requestBody };
  //     const next: NextFunction = jest.fn();

  //     registerRoute(req as Request, res as Response, next);

  //     expect(authService.register).toHaveBeenCalledWith(requestBody);
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  //   });
});
