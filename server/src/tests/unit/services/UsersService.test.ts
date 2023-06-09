import { Container } from "typedi";
import UsersService from "../../../services/UsersService";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";
import IUserRepositoryLayer from "../../../interfaces/repository/IUserRepositoryLayer";
import User from "src/models/User";

const userDetailsRequest = {
  user_name: "test",
  email: "test@example.com",
} as User;

const mockAllUserDetails = {
  user_name: "test",
  email: "test@example.com",
  password: "password",
};

const mockUserResult = {
  id: "1",
  user_name: "test",
  email: "test@example.com",
  owned_teams: ["team"],
  teams: ["team"],
} as unknown as User;

const mockUsersResult = [
  {
    id: "1",
    user_name: "test1",
    email: "test1@example.com",
    owned_teams: ["team"],
    teams: ["team"],
  },
  {
    id: "2",
    user_name: "test2",
    email: "test2@example.com",
    owned_teams: ["team"],
    teams: ["team"],
  },
] as unknown as User[];

const mockUserIdRequest = "123";

const errorMessage = "Error";

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

  describe("postUser method", () => {
    it("should create a new user and return the created user", async () => {
      await usersService.postUser(userDetailsRequest);

      expect(mockUserRepository.createUser).toHaveBeenCalledWith(
        userDetailsRequest
      );
    });

    it("should throw an error if an error occurs during user creation", async () => {
      jest
        .spyOn(mockUserRepository, "createUser")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.postUser(userDetailsRequest)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("getAllUsers method", () => {
    it("should return all users", async () => {
      jest
        .spyOn(mockUserRepository, "findAllUsers")
        .mockResolvedValue(mockUsersResult);

      const result = await usersService.getAllUsers();

      expect(mockUserRepository.findAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsersResult);
    });

    it("should throw an error if an error occurs while getting all users", async () => {
      jest
        .spyOn(mockUserRepository, "findAllUsers")
        .mockRejectedValue(new Error(errorMessage));

      await expect(usersService.getAllUsers()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("getUserByEmail method", () => {
    it("should return the user with the specified email", async () => {
      jest
        .spyOn(mockUserRepository, "findOneByEmail")
        .mockResolvedValue(mockUserResult);

      const result = await usersService.getUserByEmail(
        userDetailsRequest.email
      );

      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(
        userDetailsRequest.email
      );
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while getting the user by email", async () => {
      jest
        .spyOn(mockUserRepository, "findOneByEmail")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.getUserByEmail(userDetailsRequest.email)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("getUserByUserName method", () => {
    it("should return the user with the specified user_name", async () => {
      jest
        .spyOn(mockUserRepository, "findOneByUserName")
        .mockResolvedValue(mockUserResult);

      const result = await usersService.getUserByUserName(
        userDetailsRequest.user_name
      );

      expect(mockUserRepository.findOneByUserName).toHaveBeenCalledWith(
        userDetailsRequest.user_name
      );
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while getting the user by user_name", async () => {
      jest
        .spyOn(mockUserRepository, "findOneByUserName")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.getUserByUserName(userDetailsRequest.user_name)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("getUserById method", () => {
    it("should return the user with the specified id", async () => {
      jest
        .spyOn(mockUserRepository, "findOneById")
        .mockResolvedValue(mockUserResult);

      const result = await usersService.getUserById(mockUserIdRequest);

      expect(mockUserRepository.findOneById).toHaveBeenCalledWith(
        mockUserIdRequest
      );
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while getting the user by id", async () => {
      jest
        .spyOn(mockUserRepository, "findOneById")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.getUserById(mockUserIdRequest)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("getAllUsersDetails method", () => {
    it("should return all user details for the specified email", async () => {
      jest
        .spyOn(mockUserRepository, "findAllUserDetails")
        .mockResolvedValue(mockAllUserDetails);

      const result = await usersService.getAllUsersDetails(
        userDetailsRequest.email
      );

      expect(mockUserRepository.findAllUserDetails).toHaveBeenCalledWith(
        userDetailsRequest.email
      );
      expect(result).toEqual(mockAllUserDetails);
    });

    it("should throw an error if an error occurs while getting all user details", async () => {
      jest
        .spyOn(mockUserRepository, "findAllUserDetails")
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        usersService.getAllUsersDetails(userDetailsRequest.email)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
