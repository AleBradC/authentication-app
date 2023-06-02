import User from "../../../models/User";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";
import connectDB from "../../../dataSource";

jest.mock("../../../dataSource");

describe("PostgressUserRepository", () => {
  let repository: PostgressUserRepository;

  beforeEach(() => {
    (connectDB.getRepository as jest.Mock).mockReturnValue({
      create: jest.fn().mockReturnValue({}),
      save: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue([]),
    });

    repository = new PostgressUserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const userDetails = {
        user_name: "testuser",
        email: "test@example.com",
        password: "testpassword",
      };

      await repository.createUser(userDetails);

      expect(connectDB.getRepository(User).create).toHaveBeenCalledWith(
        userDetails
      );
      expect(connectDB.getRepository(User).save).toHaveBeenCalled();
    });

    it("should throw an error if an error occurs during user creation", async () => {
      const userDetails = {
        user_name: "testuser",
        email: "test@example.com",
        password: "testpassword",
      };

      const mockError = new Error("Error creating user");

      jest
        .spyOn(connectDB.getRepository(User), "save")
        .mockRejectedValue(mockError);

      await expect(repository.createUser(userDetails)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("findAllUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [
        { id: 1, user_name: "user1" },
        { id: 2, user_name: "user2" },
      ];

      jest
        .spyOn(connectDB.getRepository(User), "find")
        .mockResolvedValue(mockUsers as unknown as User[]);

      const result = await repository.findAllUsers();

      expect(connectDB.getRepository(User).find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it("should throw an error if an error occurs while fetching users", async () => {
      const mockError = new Error("Error fetching users");

      jest
        .spyOn(connectDB.getRepository(User), "find")
        .mockRejectedValue(mockError);

      await expect(repository.findAllUsers()).rejects.toThrow(mockError);
    });
  });

  describe("findOneById", () => {
    it("should return a user by ID", async () => {
      const userId = "123";
      const mockUser = { id: userId, user_name: "testuser" } as User;

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUser);

      const result = await repository.findOneById(userId);

      expect(result).toEqual(mockUser);
      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { id: userId },
      });
    });

    it("should throw an error if an error occurs while fetching a user by ID", async () => {
      const userId = "123";
      const mockError = new Error("Error fetching user by ID");

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(repository.findOneById(userId)).rejects.toThrow(mockError);
      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { id: userId },
      });
    });
  });

  describe("findOneByEmail", () => {
    it("should return a user by email", async () => {
      const userEmail = "test@example.com";
      const mockUser = { id: "123", user_name: "testuser" } as User;

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUser);

      const result = await repository.findOneByEmail(userEmail);

      expect(result).toEqual(mockUser);
      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { email: userEmail },
      });
    });

    it("should throw an error if an error occurs while fetching a user by email", async () => {
      const userEmail = "test@example.com";
      const mockError = new Error("Error fetching user by email");

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(repository.findOneByEmail(userEmail)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("findOneByUserName", () => {
    it("should return a user by username", async () => {
      const userName = "testuser";
      const mockUser = { id: "123", user_name: userName } as User;

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUser);

      const result = await repository.findOneByUserName(userName);

      expect(result).toEqual(mockUser);
      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        relations: [
          "owned_teams",
          "owned_teams.members",
          "teams",
          "teams.admin",
          "teams.members",
        ],
        where: { user_name: userName },
      });
    });

    it("should throw an error if an error occurs while fetching a user by username", async () => {
      const userName = "testuser";
      const mockError = new Error("Error fetching user by username");

      (connectDB.getRepository(User).findOne as jest.Mock).mockRejectedValue(
        mockError
      );

      await expect(repository.findOneByUserName(userName)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("findAllUserDetails", () => {
    it("should return all user details by email", async () => {
      const userEmail = "test@example.com";
      const mockUserDetails = { password: "testpassword" } as User;

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockResolvedValue(mockUserDetails);

      const result = await repository.findAllUserDetails(userEmail);

      expect(result).toEqual(mockUserDetails);
      expect(connectDB.getRepository(User).findOne).toHaveBeenCalledWith({
        select: {
          password: true,
        },
        where: { email: userEmail },
      });
    });

    it("should throw an error if an error occurs while fetching all user details", async () => {
      const userEmail = "test@example.com";
      const mockError = new Error("Error fetching all user details");

      jest
        .spyOn(connectDB.getRepository(User), "findOne")
        .mockRejectedValue(mockError);

      await expect(repository.findAllUserDetails(userEmail)).rejects.toThrow(
        mockError
      );
    });
  });
});
