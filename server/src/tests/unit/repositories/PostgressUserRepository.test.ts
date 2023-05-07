import User from "../../../dataBase/entities/User";
import PostgressUserRepository from "../../../repositories/PostgressUserRepository";
import connectionDB from "../../../dataBase/connectionDB";
jest.mock("../../../dataBase/connectionDB");

describe("PostgressUserRepository", () => {
  let repository: PostgressUserRepository;

  beforeAll(async () => {
    (connectionDB.getRepository as jest.Mock).mockReturnValue({
      create: jest.fn().mockReturnValue({}),
      save: jest.fn().mockReturnValue({}),
    });

    repository = new PostgressUserRepository();
  });

  it("should create a new user", async () => {
    const userDetails = {
      user_name: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };

    await repository.createUser(userDetails);

    expect(connectionDB.getRepository(User).create).toHaveBeenCalledWith(
      userDetails
    );
    expect(connectionDB.getRepository(User).save).toHaveBeenCalled();
  });
});
