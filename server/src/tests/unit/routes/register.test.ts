import AuthService from "../../../services/AuthService";
import app from "../../../app";
import Container from "typedi";

jest.mock("../../../services/AuthService", () => ({
  register: jest.fn(),
}));

describe("registerRoute", () => {
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      userService: jest.fn() as any,
    } as unknown as jest.Mocked<AuthService>;
    Container.set("IAuthService", AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and call register function from AuthService", async () => {
    const mockRegisterResponse = "User created successfully";

    const reqBody = {
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    };
  });
});
