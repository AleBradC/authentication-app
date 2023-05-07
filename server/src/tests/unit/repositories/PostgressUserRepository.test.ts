import { Container } from "typedi";

describe("UsersService", () => {
  beforeAll(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("User Repository", () => {
    it("should findOneByEmail", async () => {});
    it("should findOneByUserName", async () => {});
    it("should createUser", async () => {});
  });
});
