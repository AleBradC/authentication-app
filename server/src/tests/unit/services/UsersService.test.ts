import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";
import IUserRepositoryLayer from "../../../interfaces/repository/IUserRepositoryLayer";
import User from "src/models/User";

describe("UsersService", () => {
  let usersService: UsersService;
  let mockUserRepository: IUserRepositoryLayer;

  beforeEach(() => {
    mockUserRepository = {
      createUser: jest.fn(),
      findAllUsers: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByUserName: jest.fn(),
      findOneById: jest.fn(),
      findAllUserDetails: jest.fn(),
    } as unknown as IUserRepositoryLayer;

    Container.set(PostgressUserRepository, mockUserRepository);

    usersService = new UsersService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // varables
  const userDetails = {
    user_name: "test",
    email: "test@example.com",
  } as User;

  const user = {
    id: "1",
    user_name: "test",
    email: "test@example.com",
  } as User;

  const users = [
    {
      id: "1",
      user_name: "test1",
      email: "test1@example.com",
    },
    {
      id: "2",
      user_name: "test2",
      email: "test2@example.com",
    },
  ] as User[];

  const createdUser = {
    id: "1",
    user_name: userDetails.user_name,
    email: userDetails.email,
  } as User;

  describe("postUser", () => {
    it("should create a new user and return the created user", async () => {
      jest
        .spyOn(mockUserRepository, "createUser")
        .mockResolvedValue(createdUser);

      const result = await usersService.postUser(userDetails);

      expect(mockUserRepository.createUser).toHaveBeenCalledWith(userDetails);
      expect(result).toEqual(createdUser);
    });

    it("should throw an error if an error occurs during user creation", async () => {
      const errorMessage = "Failed to create user.";

      jest
        .spyOn(mockUserRepository, "createUser")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.postUser(userDetails)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      jest.spyOn(mockUserRepository, "findAllUsers").mockResolvedValue(users);

      const result = await usersService.getAllUsers();

      expect(mockUserRepository.findAllUsers).toHaveBeenCalled();
      expect(result).toEqual(users);
    });

    it("should throw an error if an error occurs while getting all users", async () => {
      const errorMessage = "Failed to get users.";

      jest
        .spyOn(mockUserRepository, "findAllUsers")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.getAllUsers()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getUserByEmail", () => {
    it("should return the user with the specified email", async () => {
      const email = "test@example.com";

      jest.spyOn(mockUserRepository, "findOneByEmail").mockResolvedValue(user);

      const result = await usersService.getUserByEmail(email);

      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });

    it("should throw an error if an error occurs while getting the user by email", async () => {
      const email = "test@example.com";
      const errorMessage = "Failed to get user by email.";

      jest
        .spyOn(mockUserRepository, "findOneByEmail")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.getUserByEmail(email)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getUserByUserName", () => {
    it("should return the user with the specified user_name", async () => {
      const user_name = "test";

      jest
        .spyOn(mockUserRepository, "findOneByUserName")
        .mockResolvedValue(user);

      const result = await usersService.getUserByUserName(user_name);

      expect(mockUserRepository.findOneByUserName).toHaveBeenCalledWith(
        user_name
      );
      expect(result).toEqual(user);
    });

    it("should throw an error if an error occurs while getting the user by user_name", async () => {
      const user_name = "test";
      const errorMessage = "Failed to get user by user_name.";

      jest
        .spyOn(mockUserRepository, "findOneByUserName")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.getUserByUserName(user_name)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("getUserById", () => {
    it("should return the user with the specified id", async () => {
      const id = "1";

      jest.spyOn(mockUserRepository, "findOneById").mockResolvedValue(user);

      const result = await usersService.getUserById(id);

      expect(mockUserRepository.findOneById).toHaveBeenCalledWith(id);
      expect(result).toEqual(user);
    });

    it("should throw an error if an error occurs while getting the user by id", async () => {
      const id = "1";
      const errorMessage = "Failed to get user by id.";

      jest
        .spyOn(mockUserRepository, "findOneById")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.getUserById(id)).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getAllUsersDetails", () => {
    it("should return all user details for the specified email", async () => {
      const email = "test@example.com";

      jest
        .spyOn(mockUserRepository, "findAllUserDetails")
        .mockResolvedValue(userDetails);

      const result = await usersService.getAllUsersDetails(email);

      expect(mockUserRepository.findAllUserDetails).toHaveBeenCalledWith(email);
      expect(result).toEqual(userDetails);
    });

    it("should throw an error if an error occurs while getting all user details", async () => {
      const email = "test@example.com";
      const errorMessage = "Failed to get all user details.";

      jest
        .spyOn(mockUserRepository, "findAllUserDetails")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.getAllUsersDetails(email)).rejects.toThrowError(
        errorMessage
      );
    });
  });
});
