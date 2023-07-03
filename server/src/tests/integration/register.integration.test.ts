import http from "http";
import request from "supertest";
import dbConfig from "../../../config/index";
import app from "../../app";
import connectDB from "../../dataSource";
import AuthService from "../../services/AuthService";
import UsersService from "../../services/UsersService";
import PostgresUserRepository from "../../repositories/PostgresUserRepository";
import { STATUS_CODE } from "../../utils/constants/statusCode";
import { SUCCESS } from "../../utils/constants/validations";

let server;

const user = {
  user_name: "test",
  email: "test@example.com",
  password: "testpassword",
};

async function clearTables() {
  const entities = connectDB.entityMetadatas;

  const truncatePromises = entities.map(async (entity) => {
    await connectDB.query(`TRUNCATE ${entity.tableName} CASCADE`);
  });

  await Promise.all(truncatePromises);
}

describe("Routes Integration Tests", () => {
  let authService: AuthService;
  let usersService: UsersService;
  let postresUserRepo: PostgresUserRepository;

  beforeAll(async () => {
    server = http.createServer(app);
    server.listen(dbConfig.port);

    await connectDB.initialize();

    // Create instances of services and repositories
    usersService = new UsersService();
    authService = new AuthService(usersService);
    postresUserRepo = new PostgresUserRepository();
  });

  afterAll(async () => {
    server.close();

    await connectDB.destroy();
  });

  afterEach(async () => {
    await clearTables();
  });

  it("should register a new user and return STATUS_CODE.CREATED and SUCCESS.USER_CREATED", async () => {
    const { body, status } = await request(app)
      .post("/api/register")
      .send(user);

    expect(status).toBe(STATUS_CODE.CREATED);
    expect(body).toEqual({ message: SUCCESS.USER_CREATED });
  });

  it("should call AuthService.register and register a new user", async () => {
    const authServiceResponse = await authService.register(user);

    const expectedResult = await postresUserRepo.findAllUsers();

    expect(authServiceResponse).toEqual({
      statusCode: STATUS_CODE.CREATED,
      message: SUCCESS.USER_CREATED,
    });
    expect(expectedResult?.length).toEqual(1);
  });
});
