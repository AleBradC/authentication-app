import User from "../../../models/User";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";
import connectDB from "../../../dataSource";
import IUser from "../../../interfaces/base/IUser";

const userDetailsRequest = {
  user_name: "testuser",
  email: "test@example.com",
  password: "testpassword",
};

const mockUserIdRequest = "123";

const mockUserResult = {
  id: "123",
  user_name: "testuser",
  email: "test@example.com",
  owned_teams: ["team"],
  teams: ["team"],
} as unknown as User;

const mockAllUserDetailsResult = {
  user_name: "testuser",
  email: "test@example.com",
  password: "testpassword",
} as IUser;

const mockError = new Error("Error");

jest.mock("../../../dataSource");

describe("PostgressUserRepository", () => {
  let mockUserRepository: PostgressUserRepository;

  beforeEach(() => {
    // mock DB methods
    (connectDB.getRepository as jest.Mock).mockReturnValue({
      create: jest.fn().mockReturnValue({}),
      save: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue([]),
    });

    mockUserRepository = new PostgressUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser method", () => {
    it("should create a new user", async () => {
      await mockUserRepository.createUser(userDetailsRequest);

      expect(connectDB.getRepository(User).create).toHaveBeenCalledWith(
        userDetailsRequest
      );
      expect(connectDB.getRepository(User).save).toHaveBeenCalled();
    });

    it("should throw an error if an error occurs during user creation", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "save")
        .mockRejectedValue(mockError);

      await expect(
        mockUserRepository.createUser(userDetailsRequest)
      ).rejects.toThrow(mockError);
    });
  });

  describe("findAllUsers method", () => {
    it("should return all users", async () => {
      const mockUsersResult = [
        {
          id: 1,
          user_name: "user1",
          email: "test@example.com",
          owned_teams: ["team"],
          teams: ["team"],
        },
        {
          id: 2,
          user_name: "user2",
          email: "test2@example.com",
          owned_teams: ["team2"],
          teams: ["team2"],
        },
      ] as unknown as User[];

      jest
        .spyOn(connectDB.getRepository(User), "find")
        .mockResolvedValue(mockUsersResult);

      const result = await mockUserRepository.findAllUsers();

      expect(connectDB.getRepository(User).find).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
      });
      expect(result).toEqual(mockUsersResult);
    });

    it("should throw an error if an error occurs while fetching users", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "find")
        .mockRejectedValue(mockError);

      await expect(mockUserRepository.findAllUsers()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("findOneById method", () => {
    it("should return a user by ID", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUserResult);

      const result = await mockUserRepository.findOneById(mockUserIdRequest);

      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { id: mockUserIdRequest },
      });
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while fetching a user by ID", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(
        mockUserRepository.findOneById(mockUserIdRequest)
      ).rejects.toThrow(mockError);
    });
  });

  describe("findOneByEmail method", () => {
    it("should return a user by email", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUserResult);

      const result = await mockUserRepository.findOneByEmail(
        userDetailsRequest.email
      );

      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { email: userDetailsRequest.email },
      });
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while fetching a user by email", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(
        mockUserRepository.findOneByEmail(userDetailsRequest.email)
      ).rejects.toThrow(mockError);
    });
  });

  describe("findOneByUserName", () => {
    it("should return a user by username", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUserResult);

      const result = await mockUserRepository.findOneByUserName(
        userDetailsRequest.user_name
      );

      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { user_name: userDetailsRequest.user_name },
      });
      expect(result).toEqual(mockUserResult);
    });

    it("should throw an error if an error occurs while fetching a user by username", async () => {
      (connectDB.getRepository(User).findOne as jest.Mock).mockRejectedValue(
        mockError
      );

      await expect(
        mockUserRepository.findOneByUserName(userDetailsRequest.user_name)
      ).rejects.toThrow(mockError);
    });
  });

  describe("findAllUserDetails", () => {
    it("should return all user details by email", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockAllUserDetailsResult as User);

      const result = await mockUserRepository.findAllUserDetails(
        userDetailsRequest.email
      );

      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        select: {
          password: true,
        },
        where: { email: userDetailsRequest.email },
      });
      expect(result).toEqual(mockAllUserDetailsResult as User);
    });

    it("should throw an error if an error occurs while fetching all user details", async () => {
      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(
        mockUserRepository.findAllUserDetails(mockAllUserDetailsResult.email)
      ).rejects.toThrow(mockError);
    });
  });
});
