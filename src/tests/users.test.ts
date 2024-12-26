import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import userModel, { IUser } from "../models/users_model";

var app: Express;
const baseUrl = "/users";
let _id = "";

type User = IUser & {
  accessToken?: string,
  refreshToken?: string
};
const testUser: User = {
  email: "test@user.com",
  password: "testpassword",
}
const testUser2: User = {
    email: "galgadot@user.com",
    password: "wonderwoman",
  }

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await userModel.deleteMany();  
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

describe("Users Tests", () => {
  test("Users test get all", async () => {
    const response = await request(app).get(baseUrl);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create User", async () => {
    const response = await request(app).post("/auth/register").send(testUser);
    expect(response.statusCode).toBe(200);
  });

  test("Test get user by email", async () => {
    const response = await request(app).get(baseUrl + "?email=" + testUser.email);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toBe("test@user.com");
    _id = response.body[0]._id
  });

  test("Test get user by id", async () => {
    const response = await request(app).get(baseUrl + "?id=" + _id);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].email).toBe("test@user.com");
  });

  test("Test Create User 2", async () => {
    const response = await request(app).post("/auth/register").send(testUser2);
    expect(response.statusCode).toBe(200);
  });

  test("Posts test get all 2", async () => {
    const response = await request(app).get(baseUrl);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test Delete User", async () => {
    const response = await request(app).delete(`${baseUrl}/${_id}`);
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get(baseUrl + _id);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create User fail", async () => {
    const response = await request(app).post("/auth/register")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        email: "test@mail",
      });
    expect(response.statusCode).toBe(400);
  });
});

