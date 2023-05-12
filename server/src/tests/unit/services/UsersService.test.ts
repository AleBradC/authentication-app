import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";

const mockRepository = {
  findOneByEmail: jest.fn().mockResolvedValueOnce({
    id: "test-id",
    user_name: "test-user",
    email: "test@example.com",
  }),
};
Container.set(PostgressUserRepository, mockRepository);

describe("UsersService", () => {
  let usersService: UsersService;

  beforeAll(() => {
    usersService = Container.get(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("register", () => {
    it("should getUserByEmail", async () => {
      const email = "test@example.com";
      const user = await usersService.getUserByEmail(email);

      expect(user).toEqual({
        id: "test-id",
        user_name: "test-user",
        email: "test@example.com",
      });
    });
  });
});
