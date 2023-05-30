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
      // const result = await authService.register({
      //   user_name: "",
      //   email: "test@example.com",
      //   password: "testpassword",
      // });
    });
  });
});
