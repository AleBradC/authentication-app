import app from "../../../app";
import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import AuthService from "../../../services/AuthService";
import { SUCCESS } from "../../../utils/constants/validations";

describe("registerRoute", () => {
  let mockAuthService: AuthService;
  let mockUsersService: UsersService;

  beforeEach(() => {
    mockUsersService = {
      postUser: jest.fn(),
    } as unknown as UsersService;
    Container.set(UsersService, mockUsersService);

    mockAuthService = new AuthService(mockUsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 201 and call register function from AuthService", async () => {
    const reqBody = {
      user_name: "test",
      email: "testemail",
      password: "testpassword",
    };

    jest
      .spyOn(mockAuthService, "register")
      .mockResolvedValue("SUCCESS.USER_CREATED");

    const response = await mockAuthService.register(reqBody);

    expect(mockAuthService.register).toHaveBeenCalledWith(reqBody);
    expect(response).toBe("SUCCESS.USER_CREATED");
  });
});
