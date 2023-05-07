import { Container } from "typedi";
import AuthService from "../../../services/AuthService";
import UsersService from "../../../services/UsersService";
import { USER_VALIDATION } from "../../../utils/constants/validations";

describe("AuthService", () => {
  let authService: AuthService;

  beforeAll(() => {
    Container.set("UsersService", new UsersService());
    authService = Container.get(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("AuthService", () => {
    it("should return 'All inputs are required' if user_name is missing", async () => {
      const result = await authService.register({
        user_name: "",
        email: "test@example.com",
        password: "testpassword",
      });
      expect(result).toEqual(USER_VALIDATION.REQUIRED_INPUTS);
    });

    it("should return 'All inputs are required' if email is missing", async () => {
      const result = await authService.register({
        email: "",
        user_name: "testuser",
        password: "testpassword",
      });
      expect(result).toEqual(USER_VALIDATION.REQUIRED_INPUTS);
    });

    it("should return 'All inputs are required' if password is missing", async () => {
      const result = await authService.register({
        user_name: "testuser",
        email: "test@example.com",
        password: "",
      });
      expect(result).toEqual(USER_VALIDATION.REQUIRED_INPUTS);
    });

    // it("should return 'This email is already used' if email is already used", async () => {
    //   jest.replaceProperty(
    //     UsersService.prototype,
    //     "getUserByEmail",
    //     jest.fn().mockResolvedValue({
    //       email: "test@example.com",
    //       id: "e3e3",
    //       user_name: "testUser",
    //       owned_teams: [],
    //       teams: [],
    //     })
    //   );

    //   const result = await authService.register({
    //     user_name: "testuser",
    //     email: "test@example.com",
    //     password: "testpassword",
    //   });

    //   expect(result).toEqual(USER_VALIDATION.EMAIL_USED);
    // });

    // it("should create a new user and return 'User has been created'", async () => {
    //     jest.replaceProperty(
    //       UsersService.prototype,
    //       "postUser",
    //       jest.fn().mockResolvedValueOnce({})
    //     );
    //     const result = await authService.register({
    //       user_name: "testuser",
    //       email: "test@example.com",
    //       password: "testpassword",
    //     });

    //     expect(result).toBe("User has been created");
    //   });
  });
});
